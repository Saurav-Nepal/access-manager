import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateGroupMemberTable1681715459620 extends MigrationUtility {
    constructor() {
        super('bz_group_members');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'group_id', foreignTable: 'bz_user_groups' });
        this.foreign({ name: 'user_id', foreignTable: 'sys_users' });

        this.json('attributes');
        this.whoColumns();
    }
}
