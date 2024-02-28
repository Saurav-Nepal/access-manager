import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddDefaultColumnUtlListingColumnsTable1700283900545 extends MigrationUtility {
    constructor() {
        super('utl_listing_columns');
        this.process();
    }

    process() {
        this.boolean('default', false);
    }
}
