import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateTagAssignmentTable1700856633027 extends MigrationUtility {
    constructor() {
        super('utl_tag_assignments');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'business_id', foreignTable: 'bz_business_details' });
        this.source();

        this.string('name');

        this.json('attributes');
        this.whoColumns();

        this.index(['business_id', 'name'], 'utl_tag_details_business_tag_index');
    }
}
