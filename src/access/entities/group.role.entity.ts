import { CommonEntity, RoleEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GroupRoleAttributesDto } from '../dtos/group.role.attributes.dto';
import { RoleGroupEntity } from './role.group.entity';

/**
 * entity definition against the utl_group_roles table
 * @export
 * @class GroupRoleEntity
 * @extends {CommonEntity}
 */
@Entity('utl_group_roles')
export class GroupRoleEntity extends CommonEntity {
    @Column()
    group_id: number;

    @Column()
    role_id: number;

    @Column('json')
    attributes: GroupRoleAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => RoleGroupEntity) @JoinColumn({ name: 'group_id' }) group: RoleGroupEntity;

    @ManyToOne(() => RoleEntity) @JoinColumn({ name: 'role_id' }) role: RoleEntity;
}
