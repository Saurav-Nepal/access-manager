import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BulkDefinitionLoadEntity } from '../entities/bulk.definition.load.entity';
import { BulkDefinitionLoadJob } from '../jobs/bulk.definition.load.job';

@EventSubscriber()
export class BulkDefinitionLoadSubscriber extends CommonSubscriber<BulkDefinitionLoadEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly bulkDefinitionLoadJob: BulkDefinitionLoadJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BulkDefinitionLoadEntity;
    }
    async afterInsert(evt: InsertEvent<BulkDefinitionLoadEntity>) {
        await this.bulkDefinitionLoadJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<BulkDefinitionLoadEntity>) {
        await this.bulkDefinitionLoadJob.delayedDispatch(this.getEventData(evt));
    }
}
