import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { BulkDefinitionProcessingAttributesDto } from '../dtos/bulk.definition.processing.attributes.dto';
import { BulkDefinitionEntity } from './bulk.definition.entity';
import { BulkUploadTypeEntity } from './bulk.upload.type.entity';

/**
 * entity definition against the utl_bulk_definition_processings table
 * @export
 * @class BulkDefinitionProcessingEntity
 * @extends {CommonEntity}
 */
@Entity('utl_bulk_definition_processings')
export class BulkDefinitionProcessingEntity extends CommonEntity {
    @Column()
    definition_id: number;

    @Column()
    type_id: number;

    @Column()
    priority: number;

    @Column()
    active: boolean;

    @Column('json')
    attributes: BulkDefinitionProcessingAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => BulkDefinitionEntity) @JoinColumn({ name: 'definition_id' }) definition: BulkDefinitionEntity;
    @ManyToOne(() => BulkUploadTypeEntity) @JoinColumn({ name: 'type_id' }) type: BulkUploadTypeEntity;
}
