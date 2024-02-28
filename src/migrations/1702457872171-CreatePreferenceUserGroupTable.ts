import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreatePreferenceUserGroupTable1702457872171 extends MigrationUtility {
    constructor() {
        super('utl_preference_user_groups');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'user_group_id', foreignTable: 'bz_user_groups' });
        this.foreign({ name: 'preference_id', foreignTable: 'utl_listing_preferences' });

        this.json('attributes');
        this.whoColumns();
    }
}
