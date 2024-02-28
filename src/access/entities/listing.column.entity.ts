import { ColumnDefinitionEntity, CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ListingModelEntity } from '../../accessUtility/entities/listing.model.entity';
import { ListingColumnAttributesDto } from '../dtos/listing.column.attributes.dto';
import { ListingPageEntity } from './listing.page.entity';

/**
 * entity definition against the utl_listing_columns table
 * @export
 * @class ListingColumnEntity
 * @extends {CommonEntity}
 */
@Entity('utl_listing_columns')
export class ListingColumnEntity extends CommonEntity {
    @Column()
    listing_id: number;

    @Column()
    name: string;

    @Column()
    filter_name: number;

    @Column()
    identifier: string;

    @Column()
    db_identifier: string;

    @Column()
    filter_identifier: string;

    @Column()
    description: string;

    @Column()
    column_type_id: number;

    @Column()
    macro: string;

    @Column()
    reference_url: string;

    @Column()
    reference_column: string;

    @Column()
    priority: number;

    @Column()
    is_sortable: boolean;

    @Column()
    is_db_sortable: boolean;

    @Column()
    active: boolean;

    @Column()
    is_visible: boolean;

    @Column()
    is_report_enabled: boolean;

    @Column()
    reference_model_id: number;

    @Column('json')
    query_params: any;

    @Column('json')
    attributes: ListingColumnAttributesDto;

    @Column()
    default: boolean;

    /** all related methods to go below this */
    @ManyToOne(() => ListingPageEntity) @JoinColumn({ name: 'listing_id' }) listing: ListingPageEntity;

    @ManyToOne(() => ColumnDefinitionEntity) @JoinColumn({ name: 'column_type_id' }) column_type: ColumnDefinitionEntity;

    @ManyToOne(() => ListingModelEntity) @JoinColumn({ name: 'reference_model_id' }) reference_model: ListingModelEntity;
}
