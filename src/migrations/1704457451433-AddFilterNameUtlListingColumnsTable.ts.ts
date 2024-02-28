import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddFilterNameUtlListingColumnsTable1704457451433 extends MigrationUtility {
    constructor() {
        super('utl_listing_columns');
        this.process();
    }

    process() {
        this.string('filter_name');
    }
}
