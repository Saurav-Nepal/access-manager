import { CommonEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BusinessUserAttributesDto } from '../dtos/business.user.attributes.dto';
import { AccessBusinessEntity } from './access.business.entity';

/**
 * entity definition against the bz_business_users table
 * @export
 * @class BusinessUserEntity
 * @extends {CommonEntity}
 */
@Entity('bz_business_users')
export class BusinessUserEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    user_id: number;

    @Column()
    product_id: number;

    @Column()
    active: boolean;

    @Column('json')
    attributes: BusinessUserAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;
    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'user_id' }) user: UserEntity;
}
