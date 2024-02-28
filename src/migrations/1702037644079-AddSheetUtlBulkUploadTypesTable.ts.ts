import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddSheetUtlBulkUploadTypesTable1702037644079 extends MigrationUtility {
    constructor() {
        super('utl_bulk_upload_types');
        this.process();
    }

    process() {
        this.json('sheet');
    }
}
