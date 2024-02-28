import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BulkUploadColumnEntity } from '../entities/bulk.upload.column.entity';
import { BulkUploadColumnJob } from '../jobs/bulk.upload.column.job';

@EventSubscriber()
export class BulkUploadColumnSubscriber extends CommonSubscriber<BulkUploadColumnEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly bulkUploadColumnJob: BulkUploadColumnJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return BulkUploadColumnEntity;
    }
    async afterInsert(evt: InsertEvent<BulkUploadColumnEntity>) {
        await this.bulkUploadColumnJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<BulkUploadColumnEntity>) {
        await this.bulkUploadColumnJob.delayedDispatch(this.getEventData(evt));
    }
}
