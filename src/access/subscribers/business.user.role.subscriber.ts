import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BusinessUserRoleEntity } from '../entities/business.user.role.entity';
import { BusinessUserRoleJob } from '../jobs/business.user.role.job';
@EventSubscriber()
export class BusinessUserRoleSubscriber extends CommonSubscriber<BusinessUserRoleEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly businessUserRoleJob: BusinessUserRoleJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BusinessUserRoleEntity;
    }
    async afterInsert(event: InsertEvent<BusinessUserRoleEntity>) {
        await this.businessUserRoleJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<BusinessUserRoleEntity>) {
        await this.businessUserRoleJob.delayedDispatch(this.getEventData(event));
    }
}
