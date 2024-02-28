import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateChildMenuTable1682924094072 extends MigrationUtility {
    constructor() {
        super('utl_child_menus');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'menu_id', foreignTable: 'utl_menu_details' });
        this.foreign({ name: 'parent_id', foreignTable: 'utl_menu_details' });

        this.json('attributes');
        this.whoColumns();
    }
}
