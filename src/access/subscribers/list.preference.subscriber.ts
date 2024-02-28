import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ListPreferenceEntity } from '../entities/list.preference.entity';
import { ListPreferenceJob } from '../jobs/list.preference.job';
@EventSubscriber()
export class ListPreferenceSubscriber extends CommonSubscriber<ListPreferenceEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly listPreferenceJob: ListPreferenceJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ListPreferenceEntity;
    }
    async afterInsert(event: InsertEvent<ListPreferenceEntity>) {
        await this.listPreferenceJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<ListPreferenceEntity>) {
        await this.listPreferenceJob.delayedDispatch(this.getEventData(event));
    }
}
