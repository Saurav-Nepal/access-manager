import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { MenuRoleEntity } from '../entities/menu.role.entity';
import { MenuRoleJob } from '../jobs/menu.role.job';
@EventSubscriber()
export class MenuRoleSubscriber extends CommonSubscriber<MenuRoleEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly menuRoleJob: MenuRoleJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return MenuRoleEntity;
    }
    async afterInsert(event: InsertEvent<MenuRoleEntity>) {
        await this.menuRoleJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<MenuRoleEntity>) {
        await this.menuRoleJob.delayedDispatch(this.getEventData(event));
    }
}
