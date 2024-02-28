import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BusinessUserRoleEntity } from '../entities/business.user.role.entity';
import { ProcessBusinessUserRoleUpdate } from '../libraries/process.business.user.role.update';
import { BusinessUserEntity } from '../entities/business.user.entity';
@Injectable()
export class BusinessUserRoleJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('4a7a00b3a8090e793aeabb9277e2d725');
    }
    async handle(evt: DatabaseEventDto<BusinessUserRoleEntity>) {
        await this.handleUserRole(evt);
        await this.setRoleCountCount(evt);
    }

    private async handleUserRole(evt: DatabaseEventDto<BusinessUserRoleEntity>) {
        return new ProcessBusinessUserRoleUpdate().process(evt);
    }

    private async setRoleCountCount(evt: DatabaseEventDto<BusinessUserRoleEntity>) {
        const r = await BusinessUserRoleEntity.find({ where: { business_user_id: evt.entity.business_user_id } });

        const bu = await BusinessUserEntity.first(evt.entity.business_user_id);
        if (!bu) return;

        bu.attributes = { ...bu.attributes, roles_count: r.length };
        await bu.save();
    }
}
