import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { DashboardComponentEntity } from '../entities/dashboard.component.entity';
import { DashboardComponentJob } from '../jobs/dashboard.component.job';
@EventSubscriber()
export class DashboardComponentSubscriber extends CommonSubscriber<DashboardComponentEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly dashboardComponentJob: DashboardComponentJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return DashboardComponentEntity;
    }
    async afterInsert(event: InsertEvent<DashboardComponentEntity>) {
        await this.dashboardComponentJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<DashboardComponentEntity>) {
        await this.dashboardComponentJob.delayedDispatch(this.getEventData(event));
    }
}
