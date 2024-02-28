import { OperationException, ReportEntity, ReportFilterEntity, SqlService, UploadService } from '@servicelabsco/nestjs-utility-services';
import { CommonListFilterDto } from '../dtos/common.list.filter.dto';
import { ListResponseDto } from '../dtos/list.response.dto';
import { ProcessListingCsvFile } from './process.listing.csv.file';

export class ProcessReportData {
    /**
     * the filter which is applied out here
     * @protected
     * @type {CommonListFilterDto}
     * @memberof ProcessCommonList
     */
    protected filter: CommonListFilterDto;

    /**
     * the query that is being used
     * @private
     * @type {string}
     * @memberof ProcessReportData
     */
    private query: string;

    /**
     * query restrictions based on the filter condition
     * @protected
     * @type {string[]}
     * @memberof ProcessQuoteList
     */
    protected restrictions: string[] = [];

    /**
     * the output response for the list to be rendered
     * @protected
     * @type {ListResponseDto}
     * @memberof ProcessQuoteList
     */
    protected response: ListResponseDto = { stats: {}, metrics: {}, records: [] };

    /**
     * Creates an instance of ProcessReportData.
     * @param {SqlService} sqlService
     * @param {ReportEntity} report
     * @param {UploadService} uploadService
     * @memberof ProcessReportData
     */
    constructor(
        private readonly sqlService: SqlService,
        private readonly report: ReportEntity,
        private readonly uploadService: UploadService
    ) {}

    /**
     * generate the response against the given listing record
     * @param {*} filter
     * @return {*}
     * @memberof ProcessReportData
     */
    async list(filter: any) {
        this.filter = filter;
        this.query = await this.setQuery();

        if (this.filter.aggregate) return this.aggregate();
        if (this.filter.format?.csv) return this.generateCsv();

        return this.getListRecords();
    }

    /**
     * get data against the given record
     * @param {*} filter
     * @return {*}
     * @memberof ProcessReportData
     */
    async data(filter: any) {
        this.filter = filter;
        this.query = await this.setQuery();

        // execute the sql query against the final query params
        const sql = `select * from ${this.query}`;

        return this.sqlService.read(sql);
    }

    private async getListRecords() {
        // load response data
        await this.getRecords();
        await this.getTotalRecords();

        // return response hence formed
        return this.sendResponse();
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

        // construct query as per limit offset
        const sql = `select sq.* from ${this.query} limit ${limit} offset ${offset}`;

        // attach output to appropriate response objects
        this.response.stats.limit = limit;
        this.response.stats.page = page;

        this.response.records = await this.sqlService.read(sql);
    }

    /**
     * get the metric level data
     * @private
     * @memberof ProcessPaymentList
     */
    private async getTotalRecords() {
        // construct query for the metric grouping
        if (this.filter?.no_metrics || this.filter?.format?.csv) return;

        const sql = `select count(1) count from ${this.query}`;
        const record = await this.sqlService.readFirst(sql);

        this.response.stats.total = record.count;
    }

    /**
     * construct the query as per the config
     * @private
     * @return {*}
     * @memberof ProcessCommonList
     */
    private async setQuery() {
        let sql = this.report.query.script;
        const restrictions = this.getQueryRestrictions();

        if (restrictions) sql = `${sql} and ${restrictions}`;

        // replace all the param literals in the report agianst user input
        for (const [key, value] of Object.entries(this.filter)) {
            sql = sql.replace(new RegExp(`:${key}`, 'ig'), value);
        }

        const paramRestrictions = await this.getEmbeddedFilterRestriction();
        sql = this.setFilterRestriction(sql, paramRestrictions);

        if (this.filter.filter_query) return `(${sql}) sq where ${this.filter.filter_query}`;

        return `(${sql}) sq`;
    }

    /**
     * set the filter whether embedded as defined or at the end of the generated statement
     * @private
     * @param {string} sql
     * @param {string} restriction
     * @return {*}
     * @memberof ProcessReportData
     */
    private setFilterRestriction(sql: string, restriction: string) {
        const placeHolder = ':filter_restrictions';
        const hasRestrictionPlaceholder = sql.includes(placeHolder);

        if (this.filter.injected_query) restriction = `${restriction} and (${this.filter.injected_query})`;

        if (hasRestrictionPlaceholder) {
            if (!restriction) return sql.replace(placeHolder, '');

            return sql.replace(placeHolder, `and ${restriction}`);
        }
        if (!restriction) return sql;

        return `${sql} and ${restriction}`;
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
     * send response in the format requested
     * @private
     * @return {*}
     * @memberof ProcessReportData
     */
    private async sendResponse() {
        if (!this.filter.format?.csv) return this.response;
    }

    /**
     * get the optional filters on the report query
     * @private
     * @param {ReportEntity} report
     * @param {{ [key: string]: any }} params
     * @return {*}
     * @memberof ReportService
     */
    private async getEmbeddedFilterRestriction() {
        const filters = await ReportFilterEntity.find({ where: { report_id: this.report.id } });
        if (!filters.length) return;

        const restrictions = [];
        for (const filter of filters) {
            const data = this.filter[filter.column];

            if (typeof data === 'undefined') continue;

            if (Array.isArray(data)) {
                const d = data.map((item) => `'${item}'`);

                restrictions.push(`${filter.identifier} in (${d.join(',')})`);
            } else restrictions.push(`${filter.identifier} = '${data}'`);
        }

        if (restrictions.length) return `${restrictions.join(' and ')}`;

        return '';
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
