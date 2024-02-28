import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateUiActionTable1682920799049 extends MigrationUtility {
    constructor() {
        super('utl_ui_actions');
        this.process();
    }

    process() {
        this.primary();
        this.string('name');

        this.string('label');
        this.string('display_name');

        this.string('image');
        this.string('description');

        this.foreign({ name: 'action_id', foreignTable: 'sys_system_scripts' });
        this.foreign({ name: 'validation_id', foreignTable: 'sys_system_scripts' });

        this.json('attributes');

        this.whoColumns();
    }
}
