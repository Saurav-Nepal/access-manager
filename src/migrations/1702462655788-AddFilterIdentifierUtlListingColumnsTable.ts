import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddFilterIdentifierUtlListingColumnsTable1702462655788 extends MigrationUtility {
    constructor() {
        super('utl_listing_columns');
        this.process();
    }

    process() {
        this.string('filter_identifier');
    }
}
