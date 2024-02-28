import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddRowsUtlBulkUploadsTable1704951096901 extends MigrationUtility {
    constructor() {
        super('utl_bulk_uploads');
        this.process();
    }

    process() {
        this.number('total_rows');
        this.number('analysed_rows');
        this.number('processed_rows');
    }
}
