import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity } from 'typeorm';
import { ProductAttributesDto } from '../dtos/product.attributes.dto';

/**
 * entity definition against the utl_products table
 * @export
 * @class ProductEntity
 * @extends {CommonEntity}
 */
@Entity('utl_products')
export class ProductEntity extends CommonEntity {
    @Column()
    name: string;

    @Column('json')
    attributes: ProductAttributesDto;

    /** all related methods to go below this */
}
