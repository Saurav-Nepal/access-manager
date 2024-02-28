import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { UserRoleEntity } from '../entities/user.role.entity';
import { BusinessUserRoleService } from '../services/business.user.role.service';
@Injectable()
export class UserRoleJob extends CommonJob {
    constructor(
        protected readonly queueService: QueueService,
        private readonly businessUserRoleService: BusinessUserRoleService
    ) {
        super('98f60308658ff30626fe84c0b0b55165');
    }
    async handle(evt: DatabaseEventDto<UserRoleEntity>) {
        return this.businessUserRoleService.setUserRoles(evt.entity.business_id, evt.entity.user_id);
    }
}
