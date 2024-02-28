import { CommonEntity, RoleEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UiActionRoleAttributesDto } from '../dtos/ui.action.role.attributes.dto';
import { UiActionEntity } from './ui.action.entity';

/**
 * entity definition against the utl_action_roles table
 * @export
 * @class UiActionRoleEntity
 * @extends {CommonEntity}
 */
@Entity('utl_action_roles')
export class UiActionRoleEntity extends CommonEntity {
    @Column()
    ui_action_id: number;

    @Column()
    role_id: number;

    @Column('json')
    attributes: UiActionRoleAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => UiActionEntity) @JoinColumn({ name: 'ui_action_id' }) ui_action: UiActionEntity;

    @ManyToOne(() => RoleEntity) @JoinColumn({ name: 'role_id' }) role: RoleEntity;
}
