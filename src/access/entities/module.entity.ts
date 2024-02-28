import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ModuleAttributesDto } from '../dtos/module.attributes.dto';
import { ModuleMenuEntity } from './module.menu.entity';
import { ProductEntity } from './product.entity';
import { UiActionEntity } from './ui.action.entity';

/**
 * entity definition against the utl_modules table
 * @export
 * @class ModuleEntity
 * @extends {CommonEntity}
 */
@Entity('utl_modules')
export class ModuleEntity extends CommonEntity {
    @Column()
    product_id: number;

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
    root_path: string;

    @Column()
    path: string;

    @Column()
    ui_action_id: number;

    @Column()
    spacer_above: boolean;

    @Column()
    display_order: number;

    @Column()
    active: boolean;

    @Column('json')
    attributes: ModuleAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => ProductEntity) @JoinColumn({ name: 'product_id' }) product: ProductEntity;

    @ManyToOne(() => UiActionEntity) @JoinColumn({ name: 'ui_action_id' }) ui_action: UiActionEntity;

    @OneToMany(() => ModuleMenuEntity, (module_menu) => module_menu.module) module_menus: ModuleMenuEntity[];
}
