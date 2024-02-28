import { CommonEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ListPreferenceAttributesDto } from '../dtos/list.preference.attributes.dto';
import { AccessBusinessEntity } from './access.business.entity';
import { MenuEntity } from './menu.entity';
import { ProductEntity } from './product.entity';

/**
 * entity definition against the utl_list_preferences table
 * @export
 * @class ListPreferenceEntity
 * @extends {CommonEntity}
 */
@Entity('utl_list_preferences')
export class ListPreferenceEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    menu_id: number;

    @Column()
    product_id: number;

    @Column()
    user_id: number;

    @Column()
    name: string;

    @Column('json')
    column_definition: any;

    @Column('json')
    query_definition: any;

    @Column('json')
    attributes: ListPreferenceAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;
    @ManyToOne(() => MenuEntity) @JoinColumn({ name: 'menu_id' }) menu: MenuEntity;

    @ManyToOne(() => ProductEntity) @JoinColumn({ name: 'product_id' }) product: ProductEntity;

    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'user_id' }) user: UserEntity;
}
