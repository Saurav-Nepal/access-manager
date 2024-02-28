import { UserRoleEntity } from '../entities/user.role.entity';
import { BusinessUserGroupEntity } from '../entities/business.user.group.entity';
import { GroupMemberEntity } from '../entities/group.member.entity';
import SourceHash = require('../../config/source.hash');
import { BusinessGroupRoleEntity } from '../entities/business.group.role.entity';

export class ProcessGroupMemberUpdation {
    protected group: BusinessUserGroupEntity;

    async process(entity: GroupMemberEntity) {
        this.group = await BusinessUserGroupEntity.first(entity.group_id);

        if (entity.deleted_at) return this.handleDeletion(entity);

        return this.handleInsertion(entity);
    }

    private async handleInsertion(entity: GroupMemberEntity) {
        const roles = await BusinessGroupRoleEntity.find({ where: { group_id: entity.group_id } });

        for (const role of roles) {
            await UserRoleEntity.firstOrCreate({
                business_id: this.group.business_id,
                source_type: SourceHash.groupMember,
                source_id: entity.id,
                role_id: role.role_id,
                user_id: entity.user_id,
            });
        }
    }
    private async handleDeletion(entity: GroupMemberEntity) {
        return UserRoleEntity.softDelete({
            business_id: this.group.business_id,
            source_type: SourceHash.groupMember,
            source_id: entity.id,
        });
    }
}
