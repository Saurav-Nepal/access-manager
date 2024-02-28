import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BusinessPreferenceAttributesDto } from '../dtos/business.preference.attributes.dto';
import { AccessBusinessEntity } from './access.business.entity';

/**
 * entity definition against the bz_business_preferences table
 * @export
 * @class BusinessPreferenceEntity
 * @extends {CommonEntity}
 */
@Entity('bz_business_preferences')
export class BusinessPreferenceEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    name: string;

    @Column('json')
    preference: any;

    @Column('json')
    attributes: BusinessPreferenceAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;
}
