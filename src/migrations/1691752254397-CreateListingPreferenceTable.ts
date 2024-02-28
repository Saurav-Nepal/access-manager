import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateListingPreferenceTable1691752254397 extends MigrationUtility {
    constructor() {
        super('utl_listing_preferences');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.foreign({ name: 'listing_id', foreignTable: 'utl_listing_pages' });
        this.foreign({ name: 'user_id', foreignTable: 'sys_users' });

        this.string('identifier');

        this.json('column_definition');
        this.json('query_definition');

        this.boolean('active');

        this.json('attributes');
        this.whoColumns();

        this.index(['business_id', 'listing_id', 'user_id'], 'utl_listing_preferences_user_index');
    }
}
