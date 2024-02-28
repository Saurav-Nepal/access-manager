import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBusinessUserTable1682920884085 extends MigrationUtility {
    constructor() {
        super('bz_business_users');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.foreign({ name: 'user_id', foreignTable: 'sys_users' });

        this.number('product_id');
        this.boolean('active', true);

        this.json('attributes');
        this.whoColumns();
    }
}
