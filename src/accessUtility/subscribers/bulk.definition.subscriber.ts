import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BulkDefinitionEntity } from '../entities/bulk.definition.entity';
import { BulkDefinitionJob } from '../jobs/bulk.definition.job';

@EventSubscriber()
export class BulkDefinitionSubscriber extends CommonSubscriber<BulkDefinitionEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly bulkDefinitionJob: BulkDefinitionJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BulkDefinitionEntity;
    }
    async afterInsert(evt: InsertEvent<BulkDefinitionEntity>) {
        await this.bulkDefinitionJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<BulkDefinitionEntity>) {
        await this.bulkDefinitionJob.delayedDispatch(this.getEventData(evt));
    }
}
