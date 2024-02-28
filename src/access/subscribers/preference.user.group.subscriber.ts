import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { PreferenceUserGroupEntity } from '../entities/preference.user.group.entity';
import { PreferenceUserGroupJob } from '../jobs/preference.user.group.job';
@EventSubscriber()
export class PreferenceUserGroupSubscriber extends CommonSubscriber<PreferenceUserGroupEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly preferenceUserGroupJob: PreferenceUserGroupJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return PreferenceUserGroupEntity;
    }
    async afterInsert(event: InsertEvent<PreferenceUserGroupEntity>) {
        await this.preferenceUserGroupJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<PreferenceUserGroupEntity>) {
        await this.preferenceUserGroupJob.delayedDispatch(this.getEventData(event));
    }
}
