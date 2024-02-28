import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ModuleEntity } from '../entities/module.entity';
import { ModuleJob } from '../jobs/module.job';
@EventSubscriber()
export class ModuleSubscriber extends CommonSubscriber<ModuleEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly moduleJob: ModuleJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ModuleEntity;
    }
    async afterInsert(event: InsertEvent<ModuleEntity>) {
        await this.moduleJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<ModuleEntity>) {
        await this.moduleJob.delayedDispatch(this.getEventData(event));
    }
}
