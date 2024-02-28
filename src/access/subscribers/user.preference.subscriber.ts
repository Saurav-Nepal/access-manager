import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { UserPreferenceEntity } from '../entities/user.preference.entity';
import { UserPreferenceJob } from '../jobs/user.preference.job';
@EventSubscriber()
export class UserPreferenceSubscriber extends CommonSubscriber<UserPreferenceEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly userPreferenceJob: UserPreferenceJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return UserPreferenceEntity;
    }
    async afterInsert(event: InsertEvent<UserPreferenceEntity>) {
        await this.userPreferenceJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<UserPreferenceEntity>) {
        await this.userPreferenceJob.delayedDispatch(this.getEventData(event));
    }
}
