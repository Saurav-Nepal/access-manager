import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddSheetIndexBzBulkUploadItemsTable1701020054746 extends MigrationUtility {
    constructor() {
        super('utl_bulk_upload_items');
        this.process();
    }

    process() {
        this.index(['bulk_upload_id', 'row_num', 'sheet'], 'utl_bulk_upload_items_row_sheet_index');
    }
}
