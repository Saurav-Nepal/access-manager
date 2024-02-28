import { CommonEntity, SystemScriptEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UiActionAttributesDto } from '../dtos/ui.action.attributes.dto';
import { UiActionRoleEntity } from './ui.action.role.entity';

/**
 * entity definition against the utl_ui_actions table
 * @export
 * @class UiActionEntity
 * @extends {CommonEntity}
 */
@Entity('utl_ui_actions')
export class UiActionEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    label: string;

    @Column()
    display_name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    action_id: number;

    @Column()
    validation_id: number;

    @Column('json')
    attributes: UiActionAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => SystemScriptEntity) @JoinColumn({ name: 'action_id' }) action: SystemScriptEntity;

    @ManyToOne(() => SystemScriptEntity) @JoinColumn({ name: 'validation_id' }) validation: SystemScriptEntity;

    @OneToMany(() => UiActionRoleEntity, (role) => role.ui_action) roles: UiActionRoleEntity[];
}
