import { CommonEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DashboardAttributesDto } from '../dtos/dashboard.attributes.dto';
import { AccessBusinessEntity } from './access.business.entity';
import { DashboardComponentEntity } from './dashboard.component.entity';
import { ProductEntity } from './product.entity';

/**
 * entity definition against the utl_dashboards table
 * @export
 * @class DashboardEntity
 * @extends {CommonEntity}
 */
@Entity('utl_dashboards')
export class DashboardEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    product_id: number;

    @Column()
    user_id: number;

    @Column()
    name: string;

    @Column()
    identifier: string;

    @Column()
    description: string;

    @Column()
    active: boolean;

    @Column('json')
    attributes: DashboardAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;

    @ManyToOne(() => ProductEntity) @JoinColumn({ name: 'product_id' }) product: ProductEntity;

    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'user_id' }) alias: UserEntity;

    @OneToMany(() => DashboardComponentEntity, (components) => components.dashboard) components: DashboardComponentEntity[];
}
