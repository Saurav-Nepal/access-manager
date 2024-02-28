import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ChildMenuEntity } from '../entities/child.menu.entity';
import { ChildMenuJob } from '../jobs/child.menu.job';
@EventSubscriber()
export class ChildMenuSubscriber extends CommonSubscriber<ChildMenuEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly childMenuJob: ChildMenuJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ChildMenuEntity;
    }
    async afterInsert(event: InsertEvent<ChildMenuEntity>) {
        await this.childMenuJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<ChildMenuEntity>) {
        await this.childMenuJob.delayedDispatch(this.getEventData(event));
    }
}
