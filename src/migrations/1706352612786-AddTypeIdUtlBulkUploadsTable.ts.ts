import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddTypeIdUtlBulkUploadsTable1706352612786 extends MigrationUtility {
    constructor() {
        super('utl_bulk_uploads');
        this.process();
    }

    process() {
        this.foreign({ name: 'type_id', foreignTable: 'utl_bulk_upload_types' });
    }
}
