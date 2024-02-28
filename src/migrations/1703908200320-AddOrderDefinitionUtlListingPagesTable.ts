import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddOrderDefinitionUtlListingPagesTable1703908200320 extends MigrationUtility {
    constructor() {
        super('utl_listing_pages');
        this.process();
    }

    process() {
        this.string('order_definition');
    }
}
