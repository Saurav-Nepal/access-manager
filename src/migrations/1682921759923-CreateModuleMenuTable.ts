import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateModuleMenuTable1682921759923 extends MigrationUtility {
    constructor() {
        super('utl_module_menus');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'module_id', foreignTable: 'utl_modules' });
        this.foreign({ name: 'menu_id', foreignTable: 'utl_menu_details' });

        this.number('display_order');

        this.json('attributes');
        this.whoColumns();
    }
}
