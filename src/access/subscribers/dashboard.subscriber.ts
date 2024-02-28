import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { DashboardEntity } from '../entities/dashboard.entity';
import { DashboardJob } from '../jobs/dashboard.job';
@EventSubscriber()
export class DashboardSubscriber extends CommonSubscriber<DashboardEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly dashboardJob: DashboardJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return DashboardEntity;
    }
    async afterInsert(event: InsertEvent<DashboardEntity>) {
        await this.dashboardJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<DashboardEntity>) {
        await this.dashboardJob.delayedDispatch(this.getEventData(event));
    }
}
