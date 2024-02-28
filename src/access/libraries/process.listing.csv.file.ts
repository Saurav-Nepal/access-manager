import { DateUtil, OperationException, PlatformUtility, SqlService, UploadService } from '@servicelabsco/nestjs-utility-services';
import { format } from 'date-fns';
import { ListingColumnEntity } from '../entities/listing.column.entity';

export class ProcessListingCsvFile {
    /**
     * all the columns that are part of the listing column for reports
     * @protected
     * @type {ListingColumnEntity[]}
     * @memberof ProcessListingCsvFile
     */
    protected columns: ListingColumnEntity[];

    /**
     * get all the data against the given records
     * @protected
     * @type {any[]}
     * @memberof ProcessListingCsvFile
     */
    protected records: any[];

    /**
     * the data as part of the list
     * @protected
     * @type {string[]}
     * @memberof ProcessListingCsvFile
     */
    protected list: string[] = [];

    /**
     * date in today format for file identifier
     * @private
     * @type {string}
     * @memberof ProcessListingCsvFile
     */
    private today: string;

    /**
     * Creates an instance of ProcessListingCsvFile.
     * @param {UploadService} uploadService
     * @param {SqlService} sqlService
     * @memberof ProcessListingCsvFile
     */
    constructor(
        private readonly uploadService: UploadService,
        private readonly sqlService: SqlService
    ) {}

    /**
     * process and generate file
     * @param {string} identifier
     * @param {any[]} data
     * @return {*}
     * @memberof ProcessListingCsvFile
     */
    async process(identifier: string, data: any[]) {
        this.records = data;
        this.columns = await this.setColumns(identifier);

        if (!this.columns.length) throw new OperationException(`Columns are not set for report`);

        this.today = format(new Date(), 'yyyyMMdd');

        return this.generateFile(identifier);
    }

    /**
     * get all the columns that are part of the given report
     * @private
     * @param {string} identifier
     * @return {*}
     * @memberof ProcessListingCsvFile
     */
    private async setColumns(identifier: string) {
        const sql = `select b.* from utl_listing_pages a, utl_listing_columns b where a.deleted_at is null and b.deleted_at is null and a.id = b.listing_id and b.active = true and b.is_report_enabled = true and a.identifier = '${identifier}' order by b.priority asc, b.created_at asc`;

        return this.sqlService.read(sql);
    }

    /**
     * generate csv file against the given data point
     * @private
     * @param {string} identifier
     * @return {*}
     * @memberof ProcessListingCsvFile
     */
    private async generateFile(identifier: string) {
        this.setHeader();
        this.setData();

        const buffer = Buffer.from(this.list.join('\n'), 'utf-8');
        const originalname = `export-${identifier}-${PlatformUtility.generateRandomAlpha(16).toLowerCase()}.csv`;

        const url = await this.uploadService.upload({ buffer, originalname }, { folder: `csv-exports/${this.today}` });

        return { url };
    }

    /**
     * set the top header for the given csv
     * @private
     * @memberof ProcessListingCsvFile
     */
    private setHeader() {
        const header = ['SN'];

        this.columns.forEach((column) => {
            header.push(column.name);
        });

        this.list.push(header.join(','));
    }

    /**
     * set the data point to the listing against the given column
     * @private
     * @memberof ProcessListingCsvFile
     */
    private setData() {
        let iteration = 0;

        for (const record of this.records) {
            const row = [++iteration];

            for (const column of this.columns) {
                // get data against the given identifier
                const data = this.getValue(record, column);
                row.push(data);
            }
            this.list.push(row.join(','));
        }
    }

    /**
     * modify the value of the pushing items
     * @private
     * @param {*} record
     * @param {ListingColumnEntity} column
     * @return {*}
     * @memberof ProcessListingCsvFile
     */
    private getValue(record, column: ListingColumnEntity) {
        const value = this.getData(record, column.identifier);
        if (!value) return value;

        try {
            const r = this.getFormattedValue(column, value);
            return r;
        } catch (error) {
            return value;
        }
    }

    /**
     * get formatted value to check for
     * @private
     * @param {ListingColumnEntity} column
     * @param {*} value
     * @return {*}
     * @memberof ProcessListingCsvFile
     */
    private getFormattedValue(column: ListingColumnEntity, value: any) {
        if (column.column_type_id === 1) return `"${value}"`;
        if (column.column_type_id === 3) return DateUtil.getDateInFormat(value);
        if (column.column_type_id === 4) return DateUtil.getDateTimeInFormat(value);
        if (column.column_type_id === 2) return +value;

        return value;
    }

    /**
     * get the deep nested data against the given record
     * @private
     * @param {*} record
     * @param {string} identifier
     * @return {*}
     * @memberof ProcessListingCsvFile
     */
    private getData(record: any, identifier: string) {
        const columns = identifier.split('.');

        let r = { ...record };
        if (!Object.keys(r).length) return null;

        for (const column of columns) {
            if (!r) break;
            r = r[column];
        }

        return r;
    }
}
