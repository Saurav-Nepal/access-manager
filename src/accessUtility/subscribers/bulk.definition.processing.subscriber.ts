import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BulkDefinitionProcessingEntity } from '../entities/bulk.definition.processing.entity';
import { BulkDefinitionProcessingJob } from '../jobs/bulk.definition.processing.job';

@EventSubscriber()
export class BulkDefinitionProcessingSubscriber extends CommonSubscriber<BulkDefinitionProcessingEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly bulkDefinitionProcessingJob: BulkDefinitionProcessingJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BulkDefinitionProcessingEntity;
    }
    async afterInsert(evt: InsertEvent<BulkDefinitionProcessingEntity>) {
        await this.bulkDefinitionProcessingJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<BulkDefinitionProcessingEntity>) {
        await this.bulkDefinitionProcessingJob.delayedDispatch(this.getEventData(evt));
    }
}
