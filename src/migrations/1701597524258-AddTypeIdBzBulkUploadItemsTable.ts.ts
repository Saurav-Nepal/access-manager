import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddTypeIdBzBulkUploadItemsTable1701597524258 extends MigrationUtility {
    constructor() {
        super('utl_bulk_upload_items');
        this.process();
    }

    process() {
        this.foreign({ name: 'type_id', foreignTable: 'utl_bulk_upload_types' });
    }
}
