import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { PreferenceUserEntity } from '../entities/preference.user.entity';
import { PreferenceUsersJob } from '../jobs/preference.users.job';
@EventSubscriber()
export class PreferenceUserSubscriber extends CommonSubscriber<PreferenceUserEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly preferenceUsersJob: PreferenceUsersJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return PreferenceUserEntity;
    }
    async afterInsert(event: InsertEvent<PreferenceUserEntity>) {
        await this.preferenceUsersJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<PreferenceUserEntity>) {
        await this.preferenceUsersJob.delayedDispatch(this.getEventData(event));
    }
}
