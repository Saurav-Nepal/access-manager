import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddDbIdentifierUtlListingColumnsTable1702558327190 extends MigrationUtility {
    constructor() {
        super('utl_listing_columns');
        this.process();
    }

    process() {
        this.string('db_identifier');
    }
}
