import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ListingPreferenceEntity } from '../entities/listing.preference.entity';
import { ListingPreferenceJob } from '../jobs/listing.preference.job';
@EventSubscriber()
export class ListingPreferenceSubscriber extends CommonSubscriber<ListingPreferenceEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly listingPreferenceJob: ListingPreferenceJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ListingPreferenceEntity;
    }
    async afterInsert(event: InsertEvent<ListingPreferenceEntity>) {
        await this.listingPreferenceJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<ListingPreferenceEntity>) {
        await this.listingPreferenceJob.delayedDispatch(this.getEventData(event));
    }
}
