import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddReferenceModelUtlListingColumnsTable1701928283932 extends MigrationUtility {
    constructor() {
        super('utl_listing_columns');
        this.process();
    }

    process() {
        this.foreign({ name: 'reference_model_id', foreignTable: 'utl_listing_models' });
        this.json('query_params');
    }
}
