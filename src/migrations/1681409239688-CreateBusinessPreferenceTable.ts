import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBusinessPreferenceTable1681409239688 extends MigrationUtility {
    constructor() {
        super('bz_business_preferences');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.string('name');

        this.json('preference');

        this.json('attributes');
        this.whoColumns();
    }
}
