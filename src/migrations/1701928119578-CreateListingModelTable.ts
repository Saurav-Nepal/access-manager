import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateListingModelTable1701928119578 extends MigrationUtility {
    constructor() {
        super('utl_listing_models');
        this.process();
    }

    process() {
        this.primary();

        this.string('name');
        this.string('identifier');

        this.string('method_name');
        this.json('method_params');
        this.json('class_params');

        this.json('attributes');
        this.whoColumns();
    }
}
