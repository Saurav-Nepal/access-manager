import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { DataMappingEntity } from '../entities/data.mapping.entity';
import { DataMappingJob } from '../jobs/data.mapping.job';

@EventSubscriber()
export class DataMappingSubscriber extends CommonSubscriber<DataMappingEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly dataMappingJob: DataMappingJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return DataMappingEntity;
    }
    async afterInsert(evt: InsertEvent<DataMappingEntity>) {
        await this.dataMappingJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<DataMappingEntity>) {
        await this.dataMappingJob.delayedDispatch(this.getEventData(evt));
    }
}
