import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { MenuJob } from '../jobs/menu.job';
@EventSubscriber()
export class MenuSubscriber extends CommonSubscriber<MenuEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly menuJob: MenuJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return MenuEntity;
    }
    async afterInsert(event: InsertEvent<MenuEntity>) {
        await this.menuJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<MenuEntity>) {
        await this.menuJob.delayedDispatch(this.getEventData(event));
    }
}
