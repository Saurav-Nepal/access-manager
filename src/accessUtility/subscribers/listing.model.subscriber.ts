import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ListingModelEntity } from '../entities/listing.model.entity';
import { ListingModelJob } from '../jobs/listing.model.job';

@EventSubscriber()
export class ListingModelSubscriber extends CommonSubscriber<ListingModelEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly listingModelJob: ListingModelJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ListingModelEntity;
    }
    async afterInsert(evt: InsertEvent<ListingModelEntity>) {
        await this.listingModelJob.delayedDispatch(this.getEventData(evt));
    }

    async afterUpdate(evt: UpdateEvent<ListingModelEntity>) {
        await this.listingModelJob.delayedDispatch(this.getEventData(evt));
    }
}
