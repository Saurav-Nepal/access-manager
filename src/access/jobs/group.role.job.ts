import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService, SqlService } from '@servicelabsco/nestjs-utility-services';
import { GroupRoleEntity } from '../entities/group.role.entity';
import { UserRoleEntity } from '../entities/user.role.entity';
import SOURCEHASH = require('../../config/source.hash');

@Injectable()
export class GroupRoleJob extends CommonJob {
    constructor(
        protected readonly queueService: QueueService,
        private readonly sqlService: SqlService
    ) {
        super('3cc58c9673f618e58e3080f8ab64118d');
    }

    async handle(evt: DatabaseEventDto<GroupRoleEntity>) {
        await this.handleInsertion(evt);
        await this.handleDeletion(evt);
    }

    async handleInsertion(evt: DatabaseEventDto<GroupRoleEntity>) {
        if (!this.isNewRecord(evt)) return;

        const sql = `select b.* from bz_business_user_roles a, bz_business_users b where a.deleted_at is null and b.deleted_at is null and a.business_user_id = b.id and a.role_group_id = ${evt.entity.group_id} and b.user_id is not null and b.business_id is not null`;

        const records = await this.sqlService.sql(sql);

        for (const record of records) {
            await UserRoleEntity.firstOrCreate({
                source_type: SOURCEHASH.groupRole,
                source_id: evt.entity.id,
                role_id: evt.entity.role_id,
                user_id: record.user_id,
                business_id: record.business_id,
            });
        }
    }

    async handleDeletion(evt: DatabaseEventDto<GroupRoleEntity>) {
        if (!this.isColumnUpdated(evt, ['deleted_at'])) return;
        if (!evt.entity.deleted_at) return;

        await UserRoleEntity.softDelete({
            source_type: SOURCEHASH.groupRole,
            source_id: evt.entity.id,
        });
    }
}
