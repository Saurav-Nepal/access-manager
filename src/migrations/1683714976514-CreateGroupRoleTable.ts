import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateGroupRoleTable1683714976514 extends MigrationUtility {
    constructor() {
        super('utl_group_roles');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'group_id', foreignTable: 'utl_role_groups' });
        this.foreign({ name: 'role_id', foreignTable: 'sys_roles' });

        this.json('attributes');
        this.whoColumns();
    }
}
