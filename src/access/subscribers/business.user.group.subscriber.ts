import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BusinessUserGroupEntity } from '../entities/business.user.group.entity';
import { BusinessUserGroupJob } from '../jobs/business.user.group.job';
@EventSubscriber()
export class BusinessUserGroupSubscriber extends CommonSubscriber<BusinessUserGroupEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly businessUserGroupJob: BusinessUserGroupJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BusinessUserGroupEntity;
    }
    async afterInsert(event: InsertEvent<BusinessUserGroupEntity>) {
        await this.businessUserGroupJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<BusinessUserGroupEntity>) {
        await this.businessUserGroupJob.delayedDispatch(this.getEventData(event));
    }
}
