import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBulkUploadColumnTable1700810282668 extends MigrationUtility {
    constructor() {
        super('utl_bulk_upload_columns');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'bulk_type_id', foreignTable: 'utl_bulk_upload_types' });
        this.string('name');

        this.string('identifier');

        this.boolean('is_mandatory', false);
        this.foreign({ name: 'column_type_id', foreignTable: 'sys_column_definitions' });

        this.number('priority');
        this.string('reference_field');

        this.json('attributes');
        this.whoColumns();
    }
}
