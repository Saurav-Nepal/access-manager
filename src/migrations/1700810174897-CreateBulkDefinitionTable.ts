import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateBulkDefinitionTable1700810174897 extends MigrationUtility {
    constructor() {
        super('utl_bulk_definitions');
        this.process();
    }

    process() {
        this.primary();

        this.string('name');
        this.boolean('active');

        this.json('attributes');
        this.whoColumns();
    }
}
