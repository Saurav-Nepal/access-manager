import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { UiActionEntity } from '../entities/ui.action.entity';
import { UiActionJob } from '../jobs/ui.action.job';
@EventSubscriber()
export class UiActionSubscriber extends CommonSubscriber<UiActionEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly uiActionJob: UiActionJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return UiActionEntity;
    }
    async afterInsert(event: InsertEvent<UiActionEntity>) {
        await this.uiActionJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<UiActionEntity>) {
        await this.uiActionJob.delayedDispatch(this.getEventData(event));
    }
}
