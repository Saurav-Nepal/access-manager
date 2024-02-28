import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MenuEntity } from './menu.entity';
import { UiActionEntity } from './ui.action.entity';
import { MenuActionAttributesDto } from '../dtos/menu.action.attributes.dto';

/**
 * entity definition against the utl_menu_actions table
 * @export
 * @class MenuActionEntity
 * @extends {CommonEntity}
 */
@Entity('utl_menu_actions')
export class MenuActionEntity extends CommonEntity {
    @Column()
    ui_action_id: number;

    @Column()
    menu_id: number;

    @Column('json')
    attributes: MenuActionAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => MenuEntity) @JoinColumn({ name: 'menu_id' }) menu: MenuEntity;
    @ManyToOne(() => UiActionEntity) @JoinColumn({ name: 'ui_action_id' }) ui_action: UiActionEntity;
}
