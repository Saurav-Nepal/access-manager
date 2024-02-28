import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BusinessUserRoleAttributesDto } from '../dtos/business.user.role.attributes.dto';
import { BusinessUserEntity } from './business.user.entity';
import { RoleGroupEntity } from './role.group.entity';

/**
 * entity definition against the bz_business_user_roles table
 * @export
 * @class BusinessUserRoleEntity
 * @extends {CommonEntity}
 */
@Entity('bz_business_user_roles')
export class BusinessUserRoleEntity extends CommonEntity {
    @Column()
    business_user_id: number;

    @Column()
    role_group_id: number;

    @Column('json')
    attributes: BusinessUserRoleAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => BusinessUserEntity) @JoinColumn({ name: 'business_user_id' }) business_user: BusinessUserEntity;

    @ManyToOne(() => RoleGroupEntity) @JoinColumn({ name: 'role_group_id' }) role_group: RoleGroupEntity;
}
