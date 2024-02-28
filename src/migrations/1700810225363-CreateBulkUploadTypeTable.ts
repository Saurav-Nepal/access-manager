import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBulkUploadTypeTable1700810225363 extends MigrationUtility {
    constructor() {
        super('utl_bulk_upload_types');
        this.process();
    }

    process() {
        this.primary();

        this.string('name');
        this.string('description', { width: 1024 });

        this.foreign({ name: 'model_id', foreignTable: 'sys_model_details' });
        this.char('source_type', 32);
        this.foreign({ name: 'custom_field_id', foreignTable: 'sys_lookup_values' });

        this.string('relations', { width: 1024 });

        this.json('attributes');
        this.whoColumns();
    }
}
