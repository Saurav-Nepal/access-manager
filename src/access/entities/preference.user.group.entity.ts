import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity, UserGroupEntity } from '@servicelabsco/nestjs-utility-services';
import { PreferenceUserGroupAttributesDto } from '../dtos/preference.user.group.attributes.dto';
import { ListingPreferenceEntity } from './listing.preference.entity';

/**
 * entity definition against the utl_preference_user_groups table
 * @export
 * @class PreferenceUserGroupEntity
 * @extends {CommonEntity}
 */
@Entity('utl_preference_user_groups')
export class PreferenceUserGroupEntity extends CommonEntity {
    @Column()
    user_group_id: number;

    @Column()
    preference_id: number;

    @Column('json')
    attributes: PreferenceUserGroupAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => UserGroupEntity) @JoinColumn({ name: 'user_group_id' }) user_group: UserGroupEntity;
    @ManyToOne(() => ListingPreferenceEntity) @JoinColumn({ name: 'preference_id' }) preference: ListingPreferenceEntity;
}
