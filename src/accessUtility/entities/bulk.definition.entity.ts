import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, OneToMany } from 'typeorm';
import { BulkDefinitionLoadAttributesDto } from '../dtos/bulk.definition.load.attributes.dto';
import { BulkDefinitionLoadEntity } from './bulk.definition.load.entity';
import { BulkDefinitionProcessingEntity } from './bulk.definition.processing.entity';

/**
 * entity definition against the utl_bulk_definitions table
 * @export
 * @class BulkDefinitionEntity
 * @extends {CommonEntity}
 */
@Entity('utl_bulk_definitions')
export class BulkDefinitionEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    identifier: string;

    @Column()
    active: boolean;

    @Column('json')
    attributes: BulkDefinitionLoadAttributesDto | any;

    /** all related methods to go below this */
    @OneToMany(() => BulkDefinitionLoadEntity, (load) => load.definition) loads: BulkDefinitionLoadEntity[];

    @OneToMany(() => BulkDefinitionProcessingEntity, (processing) => processing.definition) processings: BulkDefinitionProcessingEntity[];
}
