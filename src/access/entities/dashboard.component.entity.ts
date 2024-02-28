import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DashboardComponentAttributesDto } from '../dtos/dashboard.component.attributes.dto';
import { CustomReportEntity } from './custom.report.entity';
import { DashboardEntity } from './dashboard.entity';

/**
 * entity definition against the utl_dashboard_components table
 * @export
 * @class DashboardComponentEntity
 * @extends {CommonEntity}
 */
@Entity('utl_dashboard_components')
export class DashboardComponentEntity extends CommonEntity {
    @Column()
    dashboard_id: number;

    @Column()
    identifier: string;

    @Column()
    custom_report_id: number;

    @Column()
    active: boolean;

    @Column('json')
    properties: any;

    @Column('json')
    attributes: DashboardComponentAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => DashboardEntity) @JoinColumn({ name: 'dashboard_id' }) dashboard: DashboardEntity;

    @ManyToOne(() => CustomReportEntity) @JoinColumn({ name: 'custom_report_id' }) custom_report: CustomReportEntity;
}
