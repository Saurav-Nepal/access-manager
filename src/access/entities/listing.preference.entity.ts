import { CommonEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ListingPreferenceAttributesDto } from '../dtos/listing.preference.attributes.dto';
import { AccessBusinessEntity } from './access.business.entity';
import { ListingPageEntity } from './listing.page.entity';
import { PreferenceUserEntity } from './preference.user.entity';
import { PreferenceUserGroupEntity } from './preference.user.group.entity';

/**
 * entity definition against the utl_listing_preferences table
 * @export
 * @class ListingPreferenceEntity
 * @extends {CommonEntity}
 */
@Entity('utl_listing_preferences')
export class ListingPreferenceEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    listing_id: number;

    @Column()
    user_id: number;

    @Column()
    identifier: string;

    @Column('json')
    column_definition: any;

    @Column('json')
    query_definition: any;

    @Column()
    active: boolean;

    @Column()
    is_favourite: boolean;

    @Column('json')
    attributes: ListingPreferenceAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;

    @ManyToOne(() => ListingPageEntity) @JoinColumn({ name: 'listing_id' }) listing: ListingPageEntity;

    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'user_id' }) user: UserEntity;

    @OneToMany(() => PreferenceUserEntity, (preference_user) => preference_user.preference) preference_users: PreferenceUserEntity[];

    @OneToMany(() => PreferenceUserGroupEntity, (preference_user_group) => preference_user_group.preference)
    preference_user_groups: PreferenceUserGroupEntity[];
}
