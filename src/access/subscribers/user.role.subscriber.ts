import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { UserRoleEntity } from '../entities/user.role.entity';
import { UserRoleJob } from '../jobs/user.role.job';
@EventSubscriber()
export class UserRoleSubscriber extends CommonSubscriber<UserRoleEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly userRoleJob: UserRoleJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return UserRoleEntity;
    }
    async afterInsert(event: InsertEvent<UserRoleEntity>) {
        await this.userRoleJob.delayedDispatch(this.getEventData(event), { delay: 200 });
    }

    async afterUpdate(event: UpdateEvent<UserRoleEntity>) {
        await this.userRoleJob.delayedDispatch(this.getEventData(event), { delay: 200 });
    }
}
