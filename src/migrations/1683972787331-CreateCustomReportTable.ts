import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateCustomReportTable1683972787331 extends MigrationUtility {
    constructor() {
        super('utl_custom_reports');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'product_id', foreignTable: 'utl_products' });

        this.string('name');
        this.string('description');

        this.string('identifier');
        this.string('image_url');

        this.json('properties');

        this.json('attributes');
        this.whoColumns();
    }
}
