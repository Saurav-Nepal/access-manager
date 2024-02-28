import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ModuleMenuEntity } from '../entities/module.menu.entity';
import { ModuleMenuJob } from '../jobs/module.menu.job';
@EventSubscriber()
export class ModuleMenuSubscriber extends CommonSubscriber<ModuleMenuEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly moduleMenuJob: ModuleMenuJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ModuleMenuEntity;
    }
    async afterInsert(event: InsertEvent<ModuleMenuEntity>) {
        await this.moduleMenuJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<ModuleMenuEntity>) {
        await this.moduleMenuJob.delayedDispatch(this.getEventData(event));
    }
}
