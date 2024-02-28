import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BusinessUserEntity } from '../entities/business.user.entity';
import { BusinessUserJob } from '../jobs/business.user.job';
@EventSubscriber()
export class BusinessUserSubscriber extends CommonSubscriber<BusinessUserEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly businessUserJob: BusinessUserJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BusinessUserEntity;
    }
    async afterInsert(event: InsertEvent<BusinessUserEntity>) {
        await this.businessUserJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<BusinessUserEntity>) {
        await this.businessUserJob.delayedDispatch(this.getEventData(event));
    }
}
