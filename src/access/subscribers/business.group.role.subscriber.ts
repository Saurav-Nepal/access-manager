import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BusinessGroupRoleEntity } from '../entities/business.group.role.entity';
import { GroupRoleJob } from '../jobs/group.role.job';
@EventSubscriber()
export class BusinessGroupRoleSubscriber extends CommonSubscriber<BusinessGroupRoleEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly userGroupRoleJob: GroupRoleJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BusinessGroupRoleEntity;
    }
    async afterInsert(event: InsertEvent<BusinessGroupRoleEntity>) {
        await this.userGroupRoleJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<BusinessGroupRoleEntity>) {
        await this.userGroupRoleJob.delayedDispatch(this.getEventData(event));
    }
}
