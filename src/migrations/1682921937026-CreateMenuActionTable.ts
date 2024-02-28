import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateMenuActionTable1682921937026 extends MigrationUtility {
    constructor() {
        super('utl_menu_actions');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'menu_id', foreignTable: 'utl_menu_details' });
        this.foreign({ name: 'ui_action_id', foreignTable: 'utl_ui_actions' });

        this.boolean('active');

        this.json('attributes');
        this.whoColumns();
    }
}
