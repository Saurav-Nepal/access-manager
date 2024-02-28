import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateModuleTable1682921088960 extends MigrationUtility {
    constructor() {
        super('utl_modules');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'product_id', foreignTable: 'utl_products' });

        this.string('name');

        this.string('label');
        this.string('display_name');

        this.string('image');
        this.string('description');

        this.string('root_path');
        this.string('path');
        this.boolean('spacer_above', false);
        this.boolean('active', true);

        this.foreign({ name: 'ui_action_id', foreignTable: 'utl_ui_actions' });

        this.number('display_order');
        this.json('attributes');

        this.whoColumns();
    }
}
