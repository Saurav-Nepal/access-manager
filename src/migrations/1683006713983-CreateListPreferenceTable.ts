import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateListPreferenceTable1683006713983 extends MigrationUtility {
    constructor() {
        super('utl_list_preferences');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.foreign({ name: 'menu_id', foreignTable: 'utl_menu_details' });
        this.foreign({ name: 'product_id', foreignTable: 'utl_products' });
        this.foreign({ name: 'user_id', foreignTable: 'sys_users' });

        this.string('name');

        this.json('column_definition');
        this.json('query_definition');

        this.json('attributes');
        this.whoColumns();
    }
}
