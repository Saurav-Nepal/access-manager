import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { DataMappingAttributesDto } from '../dtos/data.mapping.attributes.dto';
import { AccessBusinessEntity } from '../../access/entities/access.business.entity';

/**
 * entity definition against the utl_data_mappings table
 * @export
 * @class DataMappingEntity
 * @extends {CommonEntity}
 */
@Entity('utl_data_mappings')
export class DataMappingEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    source_type: string;

    @Column()
    source_id: number;

    @Column()
    key: string;

    @Column()
    value: string;

    @Column('json')
    attributes: DataMappingAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;
}
