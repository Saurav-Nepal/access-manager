import { CommonEntity, RoleEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GroupRoleAttributesDto } from '../dtos/group.role.attributes.dto';
import { BusinessUserGroupEntity } from './business.user.group.entity';

/**
 * entity definition against the bz_group_roles table
 * @export
 * @class GroupRoleEntity
 * @extends {CommonEntity}
 */
@Entity('bz_group_roles')
export class BusinessGroupRoleEntity extends CommonEntity {
    @Column()
    group_id: number;

    @Column()
    role_id: number;

    @Column('json')
    attributes: GroupRoleAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => BusinessUserGroupEntity) @JoinColumn({ name: 'group_id' }) user_group: BusinessUserGroupEntity;

    @ManyToOne(() => RoleEntity) @JoinColumn({ name: 'role_id' }) role: RoleEntity;
}
