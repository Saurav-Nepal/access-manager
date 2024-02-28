import { Column, Entity } from 'typeorm';
import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { ListingModelAttributesDto } from '../dtos/listing.model.attributes.dto';

/**
 * entity definition against the utl_listing_models table
 * @export
 * @class ListingModelEntity
 * @extends {CommonEntity}
 */
@Entity('utl_listing_models')
export class ListingModelEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    identifier: string;

    @Column()
    method_name: string;

    @Column('json')
    method_params: any;

    @Column('json')
    class_params: any;

    @Column('json')
    attributes: ListingModelAttributesDto;

    /** all related methods to go below this */
}
