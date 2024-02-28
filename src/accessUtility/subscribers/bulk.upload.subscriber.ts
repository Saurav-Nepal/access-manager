import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BulkUploadEntity } from '../entities/bulk.upload.entity';
import { BulkUploadJob } from '../jobs/bulk.upload.job';

@EventSubscriber()
export class BulkUploadSubscriber extends CommonSubscriber<BulkUploadEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly bulkUploadJob: BulkUploadJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BulkUploadEntity;
    }
    async afterInsert(evt: InsertEvent<BulkUploadEntity>) {
        await this.bulkUploadJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<BulkUploadEntity>) {
        await this.bulkUploadJob.delayedDispatch(this.getEventData(evt));
    }
}
