import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ChildMenuAttributesDto } from '../dtos/child.menu.attributes.dto';
import { MenuEntity } from './menu.entity';

/**
 * entity definition against the utl_child_menus table
 * @export
 * @class ChildMenuEntity
 * @extends {CommonEntity}
 */
@Entity('utl_child_menus')
export class ChildMenuEntity extends CommonEntity {
    @Column()
    menu_id: number;

    @Column()
    parent_id: number;

    @Column('json')
    attributes: ChildMenuAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => MenuEntity) @JoinColumn({ name: 'menu_id' }) menu: MenuEntity;

    @ManyToOne(() => MenuEntity) @JoinColumn({ name: 'parent_id' }) parent: MenuEntity;
}
