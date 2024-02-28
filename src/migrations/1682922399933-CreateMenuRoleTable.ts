import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateMenuRoleTable1682922399933 extends MigrationUtility {
    constructor() {
        super('utl_menu_roles');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'menu_id', foreignTable: 'utl_menu_details' });
        this.foreign({ name: 'role_id', foreignTable: 'sys_roles' });

        this.json('attributes');
        this.whoColumns();
    }
}
