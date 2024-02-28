import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BusinessPreferenceEntity } from '../entities/business.preference.entity';
import { BusinessPreferenceJob } from '../jobs/business.preference.job';
@EventSubscriber()
export class BusinessPreferenceSubscriber extends CommonSubscriber<BusinessPreferenceEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly businessPreferenceJob: BusinessPreferenceJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BusinessPreferenceEntity;
    }
    async afterInsert(event: InsertEvent<BusinessPreferenceEntity>) {
        await this.businessPreferenceJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<BusinessPreferenceEntity>) {
        await this.businessPreferenceJob.delayedDispatch(this.getEventData(event));
    }
}
