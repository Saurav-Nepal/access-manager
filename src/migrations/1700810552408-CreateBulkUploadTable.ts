import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBulkUploadTable1700810552408 extends MigrationUtility {
    constructor() {
        super('utl_bulk_uploads');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.foreign({ name: 'definition_id', foreignTable: 'utl_bulk_definitions' });
        this.source();

        this.string('file_url');

        this.number('valid_records');
        this.number('invalid_records');

        this.dateTime('analysed_at');
        this.dateTime('processed_at');
        this.dateTime('approved_at');

        this.json('stats');

        this.json('attributes');
        this.whoColumns();

        this.index(['business_id', 'source_type'], 'utl_bulk_uploads_business_source_index');
    }
}
