import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBulkDefinitionProcessingTable1700810507058 extends MigrationUtility {
    constructor() {
        super('utl_bulk_definition_processings');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'definition_id', foreignTable: 'utl_bulk_definitions' });
        this.foreign({ name: 'type_id', foreignTable: 'utl_bulk_upload_types' });

        this.number('priority');
        this.boolean('active');

        this.json('attributes');
        this.whoColumns();
    }
}
