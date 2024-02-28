import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBulkUploadItemTable1700810723803 extends MigrationUtility {
    constructor() {
        super('utl_bulk_upload_items');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'bulk_upload_id', foreignTable: 'utl_bulk_uploads' });

        this.number('row_num');
        this.json('data');
        this.json('error');

        this.number('errors_count');
        this.dateTime('processed_at');

        this.string('sheet');

        this.json('attributes');
        this.whoColumns();

        this.index(['bulk_upload_id']);
    }
}
