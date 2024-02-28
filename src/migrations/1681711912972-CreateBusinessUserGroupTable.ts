import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBusinessUserGroupTable1681711912972 extends MigrationUtility {
    constructor() {
        super('bz_user_groups');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.string('name');
        this.string('description');
        this.foreign({ name: 'manager_id', foreignTable: 'sys_users' });

        this.boolean('active');

        this.json('attributes');
        this.whoColumns();
    }
}
