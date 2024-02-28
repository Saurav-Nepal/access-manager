import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateUiActionRoleTable1682922132112 extends MigrationUtility {
    constructor() {
        super('utl_action_roles');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'ui_action_id', foreignTable: 'utl_ui_actions' });
        this.foreign({ name: 'role_id', foreignTable: 'sys_roles' });

        this.json('attributes');
        this.whoColumns();
    }
}
