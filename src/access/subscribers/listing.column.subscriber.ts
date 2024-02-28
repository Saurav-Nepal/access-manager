import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ListingColumnEntity } from '../entities/listing.column.entity';
import { ListingColumnJob } from '../jobs/listing.column.job';
@EventSubscriber()
export class ListingColumnSubscriber extends CommonSubscriber<ListingColumnEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly listingColumnJob: ListingColumnJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ListingColumnEntity;
    }
    async afterInsert(event: InsertEvent<ListingColumnEntity>) {
        await this.listingColumnJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<ListingColumnEntity>) {
        await this.listingColumnJob.delayedDispatch(this.getEventData(event));
    }
}
