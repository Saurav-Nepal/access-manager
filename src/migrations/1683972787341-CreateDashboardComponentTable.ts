import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class CreateDashboardComponentTable1683972787341 extends MigrationUtility {
    constructor() {
        super('utl_dashboard_components');
        this.process();
    }

    process() {
        this.primary();

        this.foreign({ name: 'dashboard_id', foreignTable: 'utl_dashboards' });
        this.string('identifier');
        this.json('properties');

        this.foreign({ name: 'custom_report_id', foreignTable: 'utl_custom_reports' });

        this.boolean('active');

        this.json('attributes');
        this.whoColumns();
    }
}
