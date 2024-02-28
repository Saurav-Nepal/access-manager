import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateUserRoleTable1684947793186 extends MigrationUtility {
    constructor() {
        super('bz_group_roles');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'group_id', foreignTable: 'bz_user_groups' });
        this.foreign({ name: 'role_id', foreignTable: 'sys_roles' });

        this.json('attributes');
        this.whoColumns();
    }
}
