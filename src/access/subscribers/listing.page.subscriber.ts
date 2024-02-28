import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ListingPageEntity } from '../entities/listing.page.entity';
import { ListingPageJob } from '../jobs/listing.page.job';
@EventSubscriber()
export class ListingPageSubscriber extends CommonSubscriber<ListingPageEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly listingPageJob: ListingPageJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ListingPageEntity;
    }
    async afterInsert(event: InsertEvent<ListingPageEntity>) {
        await this.listingPageJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<ListingPageEntity>) {
        await this.listingPageJob.delayedDispatch(this.getEventData(event));
    }
}
