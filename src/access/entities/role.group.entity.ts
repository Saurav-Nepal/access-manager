import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RoleGroupAttributesDto } from '../dtos/role.group.attributes.dto';
import { ProductEntity } from './product.entity';
import { GroupRoleEntity } from './group.role.entity';

/**
 * entity definition against the utl_role_groups table
 * @export
 * @class RoleGroupEntity
 * @extends {CommonEntity}
 */
@Entity('utl_role_groups')
export class RoleGroupEntity extends CommonEntity {
    @Column()
    product_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('json')
    attributes: RoleGroupAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => ProductEntity) @JoinColumn({ name: 'product_id' }) product: ProductEntity;

    @OneToMany(() => GroupRoleEntity, (role) => role.group) roles: GroupRoleEntity[];
}
