import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { UserPreferenceAttributesDto } from '../dtos/user.preference.attributes.dto';
import { AccessBusinessEntity } from './access.business.entity';
import { UserEntity } from '@servicelabsco/nestjs-utility-services';
import { ProductEntity } from './product.entity';

/**
 * entity definition against the bz_user_preferences table
 * @export
 * @class UserPreferenceEntity
 * @extends {CommonEntity}
 */
@Entity('bz_user_preferences')
export class UserPreferenceEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    user_id: number;

    @Column()
    product_id: number;

    @Column()
    name: string;

    @Column('json')
    preference: any;

    @Column('json')
    attributes: UserPreferenceAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;
    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'user_id' }) user: UserEntity;
    @ManyToOne(() => ProductEntity) @JoinColumn({ name: 'business_id' }) product: ProductEntity;
}
