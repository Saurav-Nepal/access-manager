import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BulkUploadTypeEntity } from '../entities/bulk.upload.type.entity';
import { BulkUploadTypeJob } from '../jobs/bulk.upload.type.job';

@EventSubscriber()
export class BulkUploadTypeSubscriber extends CommonSubscriber<BulkUploadTypeEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly bulkUploadTypeJob: BulkUploadTypeJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BulkUploadTypeEntity;
    }
    async afterInsert(evt: InsertEvent<BulkUploadTypeEntity>) {
        await this.bulkUploadTypeJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<BulkUploadTypeEntity>) {
        await this.bulkUploadTypeJob.delayedDispatch(this.getEventData(evt));
    }
}
