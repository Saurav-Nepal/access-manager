import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddReferenceColumnUtlBulkUploadColumnsTable1700810387264 extends MigrationUtility {
    constructor() {
        super('utl_bulk_upload_columns');
        this.process();
    }

    process() {
        this.foreign({ name: 'reference_column_id', foreignTable: 'utl_bulk_upload_columns' });
    }
}
