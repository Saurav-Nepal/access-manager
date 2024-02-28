import { AccessService, ReportEntity } from '@servicelabsco/nestjs-utility-services';
import { DashboardComponentEntity } from '../entities/dashboard.component.entity';
import { DashboardEntity } from '../entities/dashboard.entity';

export class ProcessDashboardReport {
    constructor(private readonly accessService: AccessService) {}

    async process(identifier: string) {
        const dashboard = await DashboardEntity.findOne({ where: { identifier } });

        if (!dashboard) throw new AccessService();
        dashboard.components = await this.getReports(dashboard);

        return dashboard;
    }

    private async getReports(dashboard: DashboardEntity) {
        const reports = await DashboardComponentEntity.find({ where: { dashboard_id: dashboard.id, active: true } });

        const r: DashboardComponentEntity[] = [];

        for (const report of reports) {
            const hasAccess = await this.hasReportAccess(report.identifier);

            if (hasAccess) r.push(report);
        }

        return r;
    }

    private async hasReportAccess(identifier: string) {
        const report = await ReportEntity.findOne({ where: { name: identifier }, relations: ['report_roles'] });

        if (!report) return false;
        if (!report.report_roles.length) return true;

        return this.accessService.hasRoleAssignments(report.report_roles);
    }
}
