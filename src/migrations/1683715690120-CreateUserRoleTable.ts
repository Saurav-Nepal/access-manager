import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateUserRoleTable1683715690120 extends MigrationUtility {
    constructor() {
        super('bz_user_roles');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.foreign({ name: 'user_id', foreignTable: 'sys_users' });
        this.foreign({ name: 'role_id', foreignTable: 'sys_roles' });

        this.source();

        this.json('attributes');
        this.whoColumns();
    }
}
