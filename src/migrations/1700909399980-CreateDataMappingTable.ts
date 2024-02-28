import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateDataMappingTable1700909399980 extends MigrationUtility {
    constructor() {
        super('utl_data_mappings');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });

        this.source();

        this.string('key');
        this.string('value');

        this.json('attributes');
        this.whoColumns();

        this.index(['source_type', 'source_id', 'key', 'value'], 'utl_data_mappings_key_val_index');
    }
}
