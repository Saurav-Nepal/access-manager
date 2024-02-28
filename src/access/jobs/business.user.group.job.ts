import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BusinessUserGroupEntity } from '../entities/business.user.group.entity';
import { GroupMemberEntity } from '../entities/group.member.entity';
@Injectable()
export class BusinessUserGroupJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('8d9bc56e4c29169dde8f2de343ce44b9');
    }
    async handle(evt: DatabaseEventDto<BusinessUserGroupEntity>) {
        await this.setManagerAsMember(evt);
    }

    private async setManagerAsMember(evt: DatabaseEventDto<BusinessUserGroupEntity>) {
        if (!evt.entity.manager_id) return;

        await GroupMemberEntity.firstOrCreate({ group_id: evt.entity.id, user_id: evt.entity.manager_id });
    }
}
