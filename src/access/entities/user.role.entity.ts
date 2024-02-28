import { CommonEntity, RoleEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRoleAttributesDto } from '../dtos/user.role.attributes.dto';
import { AccessBusinessEntity } from './access.business.entity';

/**
 * entity definition against the bz_user_roles table
 * @export
 * @class UserRoleEntity
 * @extends {CommonEntity}
 */
@Entity('bz_user_roles')
export class UserRoleEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    user_id: number;

    @Column()
    role_id: number;

    @Column()
    source_type: string;

    @Column()
    source_id: number;

    @Column('json')
    attributes: UserRoleAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;

    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'user_id' }) user: UserEntity;

    @ManyToOne(() => RoleEntity) @JoinColumn({ name: 'role_id' }) role: RoleEntity;
}
