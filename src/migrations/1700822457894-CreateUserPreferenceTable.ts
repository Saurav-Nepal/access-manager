import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateUserPreferenceTable1700822457894 extends MigrationUtility {
    constructor() {
        super('bz_user_preferences');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.foreign({ name: 'user_id', foreignTable: 'sys_users' });
        this.foreign({ name: 'product_id', foreignTable: 'utl_products' });

        this.string('name');
        this.json('preference');

        this.json('attributes');
        this.whoColumns();

        this.index(['business_id', 'user_id', 'product_id'], 'bz_user_preferences_composite_index');
    }
}
