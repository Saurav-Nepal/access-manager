import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BusinessUserEntity } from '../entities/business.user.entity';
import { BusinessUserRoleEntity } from '../entities/business.user.role.entity';
@Injectable()
export class BusinessUserJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('1df027a19ec3d416b60ffd7024e39e5c');
    }
    async handle(evt: DatabaseEventDto<BusinessUserEntity>) {
        await this.handleDeletion(evt);
    }

    private async handleDeletion(evt: DatabaseEventDto<BusinessUserEntity>) {
        if (!evt.entity.deleted_at) return;

        const roles = await BusinessUserRoleEntity.find({ where: { business_user_id: evt.entity.id } });

        for (const role of roles) {
            await role.softDelete();
        }
    }
}
