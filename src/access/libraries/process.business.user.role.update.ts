import { DatabaseEventDto } from '@servicelabsco/nestjs-utility-services';
import { BusinessUserEntity } from '../entities/business.user.entity';
import { BusinessUserRoleEntity } from '../entities/business.user.role.entity';
import { GroupRoleEntity } from '../entities/group.role.entity';
import { UserRoleEntity } from '../entities/user.role.entity';
import SOURCEHASH = require('../../config/source.hash');

export class ProcessBusinessUserRoleUpdate {
    async process(evt: DatabaseEventDto<BusinessUserRoleEntity>) {
        if (evt.entity.deleted_at) return this.handleDeletion(evt);
        return this.handleInsertion(evt);
    }

    private async handleInsertion(evt: DatabaseEventDto<BusinessUserRoleEntity>) {
        const businessUser = await BusinessUserEntity.first(evt.entity.business_user_id);
        const roles = await GroupRoleEntity.find({ where: { group_id: evt.entity.role_group_id } });

        for (const role of roles) {
            await UserRoleEntity.firstOrCreate({
                source_type: SOURCEHASH.businessUserRole,
                source_id: evt.entity.id,
                user_id: businessUser.user_id,
                business_id: businessUser.business_id,
                role_id: role.role_id,
            });
        }
    }

    private async handleDeletion(evt: DatabaseEventDto<BusinessUserRoleEntity>) {
        await UserRoleEntity.softDelete({
            source_type: SOURCEHASH.businessUserRole,
            source_id: evt.entity.id,
        });
    }
}
