import { CommonEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GroupMemberAttributesDto } from '../dtos/group.member.attributes.dto';
import { BusinessUserGroupEntity } from './business.user.group.entity';

/**
 * entity definition against the bz_group_members table
 * @export
 * @class GroupMemberEntity
 * @extends {CommonEntity}
 */
@Entity('bz_group_members')
export class GroupMemberEntity extends CommonEntity {
    @Column()
    group_id: number;

    @Column()
    user_id: number;

    @Column('json')
    attributes: GroupMemberAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => BusinessUserGroupEntity) @JoinColumn({ name: 'group_id' }) group: BusinessUserGroupEntity;

    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'user_id' }) user: UserEntity;
}
