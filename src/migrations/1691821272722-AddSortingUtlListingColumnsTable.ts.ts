import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddSortingUtlListingColumnsTable1691821272722 extends MigrationUtility {
    constructor() {
        super('utl_listing_columns');
        this.process();
    }

    process() {
        this.boolean('is_sortable', false);
        this.boolean('is_db_sortable', false);
    }
}
