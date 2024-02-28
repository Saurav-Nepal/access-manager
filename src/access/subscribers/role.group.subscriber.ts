import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { RoleGroupEntity } from '../entities/role.group.entity';
import { RoleGroupJob } from '../jobs/role.group.job';
@EventSubscriber()
export class RoleGroupSubscriber extends CommonSubscriber<RoleGroupEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly roleGroupJob: RoleGroupJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return RoleGroupEntity;
    }
    async afterInsert(event: InsertEvent<RoleGroupEntity>) {
        await this.roleGroupJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<RoleGroupEntity>) {
        await this.roleGroupJob.delayedDispatch(this.getEventData(event));
    }
}
