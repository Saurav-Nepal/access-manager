import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ModuleMenuAttributesDto } from '../dtos/module.menu.attributes.dto';
import { MenuEntity } from './menu.entity';
import { ModuleEntity } from './module.entity';

/**
 * entity definition against the utl_module_menus table
 * @export
 * @class ModuleMenuEntity
 * @extends {CommonEntity}
 */
@Entity('utl_module_menus')
export class ModuleMenuEntity extends CommonEntity {
    @Column()
    module_id: number;

    @Column()
    menu_id: number;

    @Column()
    display_order: number;

    @Column('json')
    attributes: ModuleMenuAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => MenuEntity) @JoinColumn({ name: 'menu_id' }) menu: MenuEntity;
    @ManyToOne(() => ModuleEntity) @JoinColumn({ name: 'module_id' }) module: ModuleEntity;
}
