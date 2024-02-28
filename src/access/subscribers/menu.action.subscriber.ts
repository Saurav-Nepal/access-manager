import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { MenuActionEntity } from '../entities/menu.action.entity';
import { MenuActionJob } from '../jobs/menu.action.job';
@EventSubscriber()
export class MenuActionSubscriber extends CommonSubscriber<MenuActionEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly menuActionJob: MenuActionJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return MenuActionEntity;
    }
    async afterInsert(event: InsertEvent<MenuActionEntity>) {
        await this.menuActionJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<MenuActionEntity>) {
        await this.menuActionJob.delayedDispatch(this.getEventData(event));
    }
}
