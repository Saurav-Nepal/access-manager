import { UserRoleEntity } from '../entities/user.role.entity';
import { BusinessUserGroupEntity } from '../entities/business.user.group.entity';
import { GroupMemberEntity } from '../entities/group.member.entity';
import { BusinessGroupRoleEntity } from '../entities/business.group.role.entity';
import SourceHash = require('../../config/source.hash');

export class ProcessBusinessGroupRoleUpdation {
    protected group: BusinessUserGroupEntity;

    async process(entity: BusinessGroupRoleEntity) {
        this.group = await BusinessUserGroupEntity.first(entity.group_id);

        if (entity.deleted_at) return this.handleDeletion(entity);

        return this.handleInsertion(entity);
    }

    private async handleInsertion(entity: BusinessGroupRoleEntity) {
        const members = await GroupMemberEntity.find({ where: { group_id: entity.group_id } });

        for (const member of members) {
            await UserRoleEntity.firstOrCreate({
                source_type: SourceHash.groupRole,
                source_id: entity.id,
                role_id: entity.role_id,
                business_id: this.group.business_id,
                user_id: member.user_id,
            });
        }
    }
    private async handleDeletion(entity: BusinessGroupRoleEntity) {
        return UserRoleEntity.softDelete({ business_id: this.group.business_id, source_type: SourceHash.groupRole, source_id: entity.id });
    }
}
