import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService, SqlService } from '@servicelabsco/nestjs-utility-services';
import { BusinessUserGroupEntity } from '../entities/business.user.group.entity';
import { GroupMemberEntity } from '../entities/group.member.entity';
import { ProcessGroupMemberUpdation } from '../libraries/process.group.member.updation';
@Injectable()
export class GroupMemberJob extends CommonJob {
    constructor(
        protected readonly queueService: QueueService,
        private readonly sqlService: SqlService
    ) {
        super('19909d0969494ac331b1e53a8a80445d');
    }
    async handle(evt: DatabaseEventDto<GroupMemberEntity>) {
        await this.setCountOfMembers(evt.entity.group_id);
        await this.handleMemberUpdate(evt);
    }

    private async handleMemberUpdate(evt: DatabaseEventDto<GroupMemberEntity>) {
        return new ProcessGroupMemberUpdation().process(evt.entity);
    }

    private async setCountOfMembers(id: number) {
        const group = await BusinessUserGroupEntity.first(id);
        if (!group) return;

        const sql = `select count(1) count from bz_group_members where group_id = ${id} and deleted_at is null`;

        const r = await this.sqlService.readFirst(sql);

        group.attributes = { ...group.attributes, members: +r.count || 0 };
        await group.save();
    }
}
