import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateListingPageTable1691751680804 extends MigrationUtility {
    constructor() {
        super('utl_listing_pages');
        this.process();
    }

    process() {
        this.primary();

        this.string('name');
        this.string('identifier');

        this.string('description');

        this.json('attributes');
        this.whoColumns();

        this.uniqueIndex(['identifier'], 'utl_listing_pages_identifier_index');
    }
}
