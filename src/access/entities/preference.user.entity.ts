import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { PreferenceUsersAttributesDto } from '../dtos/preference.users.attributes.dto';
import { ListingPreferenceEntity } from './listing.preference.entity';

/**
 * entity definition against the utl_preference_users table
 * @export
 * @class PreferenceUsersEntity
 * @extends {CommonEntity}
 */
@Entity('utl_preference_users')
export class PreferenceUserEntity extends CommonEntity {
    @Column()
    user_id: number;

    @Column()
    preference_id: number;

    @Column('json')
    attributes: PreferenceUsersAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'user_id' }) user: UserEntity;
    @ManyToOne(() => ListingPreferenceEntity) @JoinColumn({ name: 'preference_id' }) preference: ListingPreferenceEntity;
}
