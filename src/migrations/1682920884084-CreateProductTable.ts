import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateProductTable1682920884084 extends MigrationUtility {
    constructor() {
        super('utl_products');
        this.process();
    }

    process() {
        this.primary();

        this.string('name');

        this.json('attributes');
        this.whoColumns();
    }
}
