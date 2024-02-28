import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreatePreferenceUsersTable1702457792640 extends MigrationUtility {
    constructor() {
        super('utl_preference_users');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'user_id', foreignTable: 'sys_users' });
        this.foreign({ name: 'preference_id', foreignTable: 'utl_listing_preferences' });

        this.json('attributes');
        this.whoColumns();
    }
}
