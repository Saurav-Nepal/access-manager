import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BulkDefinitionLoadAttributesDto } from '../dtos/bulk.definition.load.attributes.dto';
import { BulkDefinitionEntity } from './bulk.definition.entity';
import { BulkUploadTypeEntity } from './bulk.upload.type.entity';

/**
 * entity definition against the utl_bulk_definition_loads table
 * @export
 * @class BulkDefinitionLoadEntity
 * @extends {CommonEntity}
 */
@Entity('utl_bulk_definition_loads')
export class BulkDefinitionLoadEntity extends CommonEntity {
    @Column()
    definition_id: number;

    @Column()
    type_id: number;

    @Column()
    priority: number;

    @Column()
    active: boolean;

    @Column('json')
    attributes: BulkDefinitionLoadAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => BulkDefinitionEntity) @JoinColumn({ name: 'definition_id' }) definition: BulkDefinitionEntity;
    @ManyToOne(() => BulkUploadTypeEntity) @JoinColumn({ name: 'type_id' }) type: BulkUploadTypeEntity;
}
