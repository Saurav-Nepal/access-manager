import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MenuRoleEntity } from './menu.role.entity';
import { UiActionEntity } from './ui.action.entity';
import { MenuActionEntity } from './menu.action.entity';
import { ChildMenuEntity } from './child.menu.entity';

/**
 * entity definition against the utl_menu_details table
 * @export
 * @class MenuEntity
 * @extends {CommonEntity}
 */
@Entity('utl_menu_details')
export class MenuEntity extends CommonEntity {
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
    ui_action_id: number;

    @Column()
    root_path: string;

    @Column()
    path: string;

    @Column()
    visibility: boolean;

    @Column('json')
    attributes: any;

    /** all related methods to go below this */
    @ManyToOne(() => UiActionEntity) @JoinColumn({ name: 'ui_action_id' }) ui_action: UiActionEntity;

    @OneToMany(() => MenuRoleEntity, (role) => role.menu) roles: MenuRoleEntity[];

    @OneToMany(() => MenuActionEntity, (menu_ui_action) => menu_ui_action.menu) menu_ui_actions: MenuActionEntity[];

    @OneToMany(() => ChildMenuEntity, (child_menu) => child_menu.parent) child_menus: ChildMenuEntity[];

    ui_actions: UiActionEntity[];
}
