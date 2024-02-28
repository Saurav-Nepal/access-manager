import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddIdentifierUtlBulkDefinitionsTable1708781656587 extends MigrationUtility {
    constructor() {
        super('utl_bulk_definitions');
        this.process();
    }

    process() {
        this.string('identifier');
    }
}
