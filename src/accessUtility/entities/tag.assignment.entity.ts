import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AccessBusinessEntity } from '../../access/entities/access.business.entity';
import { TagAssignmentAttributesDto } from '../dtos/tag.assignment.attributes.dto';

/**
 * entity definition against the utl_tag_assignments table
 * @export
 * @class TagAssignmentEntity
 * @extends {CommonEntity}
 */
@Entity('utl_tag_assignments')
export class TagAssignmentEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    source_type: string;

    @Column()
    source_id: number;

    @Column()
    name: string;

    @Column('json')
    attributes: TagAssignmentAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;
}
