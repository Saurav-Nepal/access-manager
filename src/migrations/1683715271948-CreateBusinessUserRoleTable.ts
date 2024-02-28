import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBusinessUserRoleTable1683715271948 extends MigrationUtility {
    constructor() {
        super('bz_business_user_roles');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_user_id', foreignTable: 'bz_business_users' });
        this.foreign({ name: 'role_group_id', foreignTable: 'utl_role_groups' });

        this.json('attributes');
        this.whoColumns();
    }
}
