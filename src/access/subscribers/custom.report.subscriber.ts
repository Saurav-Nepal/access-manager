import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { CustomReportEntity } from '../entities/custom.report.entity';
import { CustomReportJob } from '../jobs/custom.report.job';
@EventSubscriber()
export class CustomReportSubscriber extends CommonSubscriber<CustomReportEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly customReportJob: CustomReportJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return CustomReportEntity;
    }
    async afterInsert(event: InsertEvent<CustomReportEntity>) {
        await this.customReportJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<CustomReportEntity>) {
        await this.customReportJob.delayedDispatch(this.getEventData(event));
    }
}
