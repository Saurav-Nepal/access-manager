import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddVisibilityUtlListingColumnsTable1693641946423 extends MigrationUtility {
    constructor() {
        super('utl_listing_columns');
        this.process();
    }

    process() {
        this.boolean('is_visible', true);
        this.boolean('is_report_enabled', true);
    }
}
