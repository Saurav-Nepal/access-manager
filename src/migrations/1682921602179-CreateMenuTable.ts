import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateMenuTable1682921602179 extends MigrationUtility {
    constructor() {
        super('utl_menu_details');
        this.process();
    }

    process() {
        this.primary();

        this.string('name');

        this.string('label');
        this.string('display_name');

        this.string('image');
        this.string('description');

        this.string('path');
        this.string('root_path');

        this.boolean('visibility');

        this.foreign({ name: 'ui_action_id', foreignTable: 'utl_ui_actions' });

        this.json('attributes');

        this.whoColumns();
    }
}
