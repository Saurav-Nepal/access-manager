import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { GroupMemberEntity } from '../entities/group.member.entity';
import { GroupMemberJob } from '../jobs/group.member.job';
@EventSubscriber()
export class GroupMemberSubscriber extends CommonSubscriber<GroupMemberEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly groupMemberJob: GroupMemberJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return GroupMemberEntity;
    }
    async afterInsert(event: InsertEvent<GroupMemberEntity>) {
        await this.groupMemberJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<GroupMemberEntity>) {
        await this.groupMemberJob.delayedDispatch(this.getEventData(event));
    }
}
