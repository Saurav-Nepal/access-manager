import { CommonEntity, RoleEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MenuRoleAttributesDto } from '../dtos/menu.role.attributes.dto';
import { MenuEntity } from './menu.entity';

/**
 * entity definition against the utl_menu_roles table
 * @export
 * @class MenuRoleEntity
 * @extends {CommonEntity}
 */
@Entity('utl_menu_roles')
export class MenuRoleEntity extends CommonEntity {
    @Column()
    menu_id: number;

    @Column()
    role_id: number;

    @Column('json')
    attributes: MenuRoleAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => MenuEntity) @JoinColumn({ name: 'menu_id' }) menu: MenuEntity;

    @ManyToOne(() => RoleEntity) @JoinColumn({ name: 'role_id' }) role: RoleEntity;
}
