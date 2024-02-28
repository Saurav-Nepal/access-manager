import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { GroupRoleEntity } from '../entities/group.role.entity';
import { GroupRoleJob } from '../jobs/group.role.job';
@EventSubscriber()
export class GroupRoleSubscriber extends CommonSubscriber<GroupRoleEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly groupRoleJob: GroupRoleJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return GroupRoleEntity;
    }
    async afterInsert(event: InsertEvent<GroupRoleEntity>) {
        await this.groupRoleJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<GroupRoleEntity>) {
        await this.groupRoleJob.delayedDispatch(this.getEventData(event));
    }
}
