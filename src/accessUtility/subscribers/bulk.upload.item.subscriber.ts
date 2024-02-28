import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BulkUploadItemEntity } from '../entities/bulk.upload.item.entity';
import { BulkUploadItemJob } from '../jobs/bulk.upload.item.job';

@EventSubscriber()
export class BulkUploadItemSubscriber extends CommonSubscriber<BulkUploadItemEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly bulkUploadItemJob: BulkUploadItemJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BulkUploadItemEntity;
    }
    async afterInsert(evt: InsertEvent<BulkUploadItemEntity>) {
        await this.bulkUploadItemJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<BulkUploadItemEntity>) {
        await this.bulkUploadItemJob.delayedDispatch(this.getEventData(evt));
    }
}
