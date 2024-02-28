import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { UiActionRoleEntity } from '../entities/ui.action.role.entity';
import { UiActionRoleJob } from '../jobs/ui.action.role.job';
@EventSubscriber()
export class UiActionRoleSubscriber extends CommonSubscriber<UiActionRoleEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly uiActionRoleJob: UiActionRoleJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return UiActionRoleEntity;
    }
    async afterInsert(event: InsertEvent<UiActionRoleEntity>) {
        await this.uiActionRoleJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<UiActionRoleEntity>) {
        await this.uiActionRoleJob.delayedDispatch(this.getEventData(event));
    }
}
