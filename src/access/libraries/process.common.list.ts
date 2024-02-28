import { OperationException, SqlService, UploadService } from '@servicelabsco/nestjs-utility-services';
import { CommonListFilterDto } from '../dtos/common.list.filter.dto';
import { DateFilterDto } from '../dtos/date.filter.dto';
import { ListResponseDto } from '../dtos/list.response.dto';
import { ProcessDateFilter } from './process.date.filter';
import { ProcessListingCsvFile } from './process.listing.csv.file';

/**
 * process common generic listing
 * @export
 * @class ProcessCommonList
 */
export class ProcessCommonList {
    protected config: { sql: string; order: string; columns: string[]; metrics?: string[] };

    /**
     * the filter which is applied out here
     * @protected
     * @type {CommonListFilterDto}
     * @memberof ProcessCommonList
     */
    protected filter: CommonListFilterDto;

    /**
     * query restrictions based on the filter condition
     * @protected
     * @type {string[]}
     * @memberof ProcessQuoteList
     */
    protected restrictions: string[] = [];

    /**
     * the query finally created post application of filter restrictions
     * @protected
     * @type {string}
     * @memberof ProcessQuoteList
     */
    protected query: string;

    /**
     * the output response for the list to be rendered
     * @protected
     * @type {ListResponseDto}
     * @memberof ProcessQuoteList
     */
    protected response: ListResponseDto = { stats: {}, metrics: {}, records: [] };

    /**
     * instance of the sql service
     * @protected
     * @type {SqlService}
     * @memberof ProcessCommonList
     */
    protected sqlService: SqlService;

    /**
     * the instance of uploadService
     * @protected
     * @type {UploadService}
     * @memberof ProcessCommonList
     */
    protected uploadService: UploadService;

    protected async handle(): Promise<ListResponseDto> {
        this.query = this.getQuery();

        if (this.filter.aggregate) return this.aggregate();
        if (this.filter.format?.csv) return this.generateCsv();

        return this.getListRecords();
    }

    private async getListRecords() {
        // load response data
        await this.getRecords();
        await this.getTotalRecords();

        // return response hence formed
        return this.response;
    }

    /**
     * get the metric level data
     * @private
     * @memberof ProcessPaymentList
     */
    private async getTotalRecords() {
        // construct query for the metric grouping
        if (this.filter?.no_metrics || this.filter?.format?.csv) return;
        const metrics = this.config?.metrics || [];

        metrics.push(`count(1) count`);

        const sql = `select ${this.config.metrics.join(',')} from ${this.query}`;
        const record = await this.sqlService.readFirst(sql);

        this.response.stats.total = record.count;
        this.response.metrics = {};

        for (const [key, value] of Object.entries(record)) {
            if (key === 'count') continue;

            this.response.metrics[key] = value;
        }
    }

    /**
     * construct the query restriction portion
     * @protected
     * @return {*}  {string}
     * @memberof ProcessQuoteList
     */
    private getQueryRestrictions(): string {
        if (!this.restrictions.length) return;

        const record: string[] = [];

        // making all restriction isolated from each other
        this.restrictions.forEach((restriction) => {
            record.push(` ( ${restriction} ) `);
        });

        return record.join('and');
    }

    /**
     * construct the query as per the config
     * @private
     * @return {*}
     * @memberof ProcessCommonList
     */
    private getQuery() {
        const restrictions = this.getQueryRestrictions();
        const columns = this.config.columns.join(',');

        let sql = `select ${columns} from ${this.config.sql}`;

        if (restrictions) sql = `${sql} and ${restrictions} `;

        if (this.filter.filter_query) return `(${sql}) sq where ${this.filter.filter_query}`;

        return `(${sql}) sq`;
    }

    /**
     * get the records off the query and config params
     * @private
     * @memberof ProcessCommonList
     */
    private async getRecords() {
        // get the offset as per limit
        const filter = this.filter;

        const limit = filter.limit ?? 20;
        const page = filter.page || 1;

        const offset = (page - 1) * limit;

        const order = this.config.order || 'sq.created_at desc';

        // construct query as per limit offset
        const sql = `select sq.* from ${this.query} order by ${order} limit ${limit} offset ${offset}`;

        // attach output to appropriate response objects
        this.response.stats.limit = limit;
        this.response.stats.page = page;

        this.response.records = await this.sqlService.read(sql);
    }

    /**
     * execute the aggregate function and give back the results
     * @private
     * @return {*}
     * @memberof ProcessCommonList
     */
    private async aggregate() {
        const aggregate = this.filter.aggregate;
        const supportedOperations = ['avg', 'sum', 'max', 'min'];

        const key: string = Object.keys(aggregate)[0];
        if (supportedOperations.indexOf(key) === -1) throw new OperationException(`Given aggregate function ${key} is not supported`);

        const value: string = Object.values(aggregate)[0];

        const sql = `select ${key}(sq.${value}) aggregate from ${this.query}`;

        const response = await this.sqlService.readFirst(sql);

        return { aggregate: response.aggregate };
    }

    /**
     * set the filter condition for date
     * @protected
     * @param {DateFilterDto} date
     * @param {string} [column]
     * @return {*}
     * @memberof ProcessCommonBusinessList
     */
    protected processDate(date: DateFilterDto, column: string) {
        const range = new ProcessDateFilter().process(date);
        if (!range) return;

        this.restrictions.push(`${column} between '${range.min}' and '${range.max}'`);
    }

    /**
     * generate csv file against the given records
     * @private
     * @return {*}
     * @memberof ProcessCommonList
     */
    private async generateCsv() {
        if (!this.filter?.listing_slug) throw new OperationException(`listing slug is mandatory for csv exports`);

        const dataSql = `select sq.* from ${this.query} limit 1000`;
        const records = await this.sqlService.read(dataSql);

        return new ProcessListingCsvFile(this.uploadService, this.sqlService).process(this.filter.listing_slug, records);
    }
}
