import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateListingColumnTable1691752028950 extends MigrationUtility {
    constructor() {
        super('utl_listing_columns');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'listing_id', foreignTable: 'utl_listing_pages' });

        this.string('name');
        this.string('identifier');
        this.string('description');

        this.foreign({ name: 'column_type_id', foreignTable: 'sys_column_definitions' });

        this.string('macro');
        this.string('reference_url');
        this.string('reference_column');

        this.number('priority');
        this.boolean('active');

        this.json('attributes');
        this.whoColumns();
    }
}
