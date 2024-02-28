import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateRoleGroupTable1683714575296 extends MigrationUtility {
    constructor() {
        super('utl_role_groups');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'product_id', foreignTable: 'utl_products' });

        this.string('name');
        this.string('description');

        this.json('attributes');
        this.whoColumns();
    }
}
