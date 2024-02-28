import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateDashboardTable1683972209257 extends MigrationUtility {
    constructor() {
        super('utl_dashboards');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.foreign({ name: 'product_id', foreignTable: 'utl_products' });
        this.foreign({ name: 'user_id', foreignTable: 'sys_users' });

        this.string('name');
        this.string('identifier');
        this.string('description');

        this.boolean('active');

        this.json('attributes');
        this.whoColumns();
    }
}
