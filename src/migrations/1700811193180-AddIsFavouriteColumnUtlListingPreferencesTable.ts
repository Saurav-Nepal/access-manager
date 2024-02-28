import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddIsFavouriteColumnUtlListingPreferencesTable1700811193180 extends MigrationUtility {
    constructor() {
        super('utl_listing_preferences');
        this.process();
    }

    process() {
        this.boolean('is_favourite', false);
    }
}
