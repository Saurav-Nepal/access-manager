import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccessService, Auth, SqlService } from '@servicelabsco/nestjs-utility-services';
import { AccessBusinessParamDto } from '../dtos/access.business.param.dto';
import { StringSearchDto } from '../dtos/string.search.dto';
import { ProcessDashboardReport } from '../libraries/process.dashboard.report';

@Controller('api/product/:id/dashboard')
export class DashboardController {
    constructor(
        private readonly sqlService: SqlService,
        private readonly accessService: AccessService
    ) {}

    @Get()
    async getDashboards(@Param() params: AccessBusinessParamDto) {
        const user = Auth.user();
        const businessId = user.auth_attributes?.business_id;

        const sql = `select a.* from utl_dashboards a where a.deleted_at is null and a.product_id = ${params.id} and  (a.business_id is null or a.business_id = ${businessId}) and (a.user_id is null or a.user_id = ${user.id})`;

        return this.sqlService.read(sql);
    }

    @Post(':slug/reports')
    async getReports(@Param() params: AccessBusinessParamDto, @Body() body: StringSearchDto) {
        const str = body.str;
        const limit = body.limit || 10;

        let sql = `select b.* from utl_dashboards a, utl_dashboard_components b where a.identifier = '${params.slug}' and a.id = b.dashboard_id and a.deleted_at is null and not EXISTS (select 1 from sys_report_details c where b.identifier = c.name and c.deleted_at is null)`;

        if (str) {
            sql = `${sql} and (b.name ilike '%${str}%')`;
        }

        return this.sqlService.read(`${sql} order by b.name asc limit ${limit}`);
    }

    @Get(':slug')
    async getDashboardDetails(@Param() params: AccessBusinessParamDto) {
        return new ProcessDashboardReport(this.accessService).process(params.slug);
    }
}
