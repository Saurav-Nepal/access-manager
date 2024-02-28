import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class AddQueryUtlListingPagesTable1702558413676 extends MigrationUtility {
    constructor() {
        super('utl_listing_pages');
        this.process();
    }

    process() {
        this.foreign({ name: 'query_id', foreignTable: 'sys_system_scripts' });
    }
}
