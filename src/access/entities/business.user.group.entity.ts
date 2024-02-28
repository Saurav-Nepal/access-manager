import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '@servicelabsco/nestjs-utility-services';
import { BusinessUserGroupAttributesDto } from '../dtos/business.user.group.attributes.dto';
import { AccessBusinessEntity } from './access.business.entity';

/**
 * entity definition against the bz_user_groups table
 * @export
 * @class BusinessUserGroupEntity
 * @extends {CommonEntity}
 */
@Entity('bz_user_groups')
export class BusinessUserGroupEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    manager_id: number;

    @Column()
    active: boolean;

    @Column('json')
    attributes: BusinessUserGroupAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;
    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'manager_id' }) manager: UserEntity;
}
