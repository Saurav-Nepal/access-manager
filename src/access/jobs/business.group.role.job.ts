import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService, SqlService } from '@servicelabsco/nestjs-utility-services';
import { BusinessGroupRoleEntity } from '../entities/business.group.role.entity';
import { BusinessUserGroupEntity } from '../entities/business.user.group.entity';
import { ProcessBusinessGroupRoleUpdation } from '../libraries/process.business.group.role.updation';

@Injectable()
export class BusinessGroupRoleJob extends CommonJob {
    constructor(
        protected readonly queueService: QueueService,
        private readonly sqlService: SqlService
    ) {
        super('f456a6f7d1791af00f58d78bbaab144b');
    }
    async handle(evt: DatabaseEventDto<BusinessGroupRoleEntity>) {
        await this.handleUserRole(evt);
        await this.setCountOfRoles(evt.entity.group_id);
    }

    private async handleUserRole(evt: DatabaseEventDto<BusinessGroupRoleEntity>) {
        return new ProcessBusinessGroupRoleUpdation().process(evt.entity);
    }

    private async setCountOfRoles(id: number) {
        const group = await BusinessUserGroupEntity.first(id);
        if (!group) return;

        const sql = `select count(1) count from bz_group_roles where group_id = ${id} and deleted_at is null`;

        const r = await this.sqlService.readFirst(sql);

        group.attributes = { ...group.attributes, roles: +r.count || 0 };
        await group.save();
    }
}
