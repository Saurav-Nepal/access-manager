import { CommonEntity, SystemScriptEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ListingPageAttributesDto } from '../dtos/listing.page.attributes.dto';
import { ListingColumnEntity } from './listing.column.entity';

/**
 * entity definition against the utl_listing_pages table
 * @export
 * @class ListingPageEntity
 * @extends {CommonEntity}
 */
@Entity('utl_listing_pages')
export class ListingPageEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    identifier: string;

    @Column()
    query_id: number;

    @Column()
    description: string;

    @Column('json')
    attributes: ListingPageAttributesDto;

    @Column()
    order_definition: string;

    /** all related methods to go below this */
    @OneToMany(() => ListingColumnEntity, (column) => column.listing) columns: ListingColumnEntity[];

    @ManyToOne(() => SystemScriptEntity) @JoinColumn({ name: 'query_id' }) query: SystemScriptEntity;
}
