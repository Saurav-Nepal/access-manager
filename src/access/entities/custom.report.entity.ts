import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CustomReportAttributesDto } from '../dtos/custom.report.attributes.dto';
import { ProductEntity } from './product.entity';

/**
 * entity definition against the utl_custom_reports table
 * @export
 * @class CustomReportEntity
 * @extends {CommonEntity}
 */
@Entity('utl_custom_reports')
export class CustomReportEntity extends CommonEntity {
    @Column()
    product_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    identifier: string;

    @Column()
    image_url: string;

    @Column('json')
    properties: any;

    @Column('json')
    attributes: CustomReportAttributesDto;

    /** all related methods to go below this */
    @ManyToOne(() => ProductEntity) @JoinColumn({ name: 'product_id' }) product: ProductEntity;
}
