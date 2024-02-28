import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { TagAssignmentEntity } from '../entities/tag.assignment.entity';
import { TagAssignmentJob } from '../jobs/tag.assignment.job';

@EventSubscriber()
export class TagAssignmentSubscriber extends CommonSubscriber<TagAssignmentEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly tagAssignmentJob: TagAssignmentJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return TagAssignmentEntity;
    }
    async afterInsert(evt: InsertEvent<TagAssignmentEntity>) {
        await this.tagAssignmentJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<TagAssignmentEntity>) {
        await this.tagAssignmentJob.delayedDispatch(this.getEventData(evt));
    }
}
