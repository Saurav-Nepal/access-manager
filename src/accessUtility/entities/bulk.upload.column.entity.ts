import { ColumnDefinitionEntity, CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BulkUploadTypeEntity } from './bulk.upload.type.entity';

/**
 * entity definition against the utl_bulk_upload_columns table
 * @export
 * @class BulkUploadColumnEntity
 * @extends {CommonEntity}
 */
@Entity('utl_bulk_upload_columns')
export class BulkUploadColumnEntity extends CommonEntity {
    @Column()
    bulk_type_id: number;

    @Column()
    name: string;

    @Column()
    reference_field: string;

    @Column()
    identifier: string;

    @Column()
    is_mandatory: boolean;

    @Column()
    column_type_id: number;

    @Column()
    reference_column_id: number;

    @Column()
    priority: number;

    @Column('json')
    attributes: any;

    /** all related methods to go below this */
    @ManyToOne(() => ColumnDefinitionEntity) @JoinColumn({ name: 'column_type_id' }) column_type: ColumnDefinitionEntity;

    @ManyToOne(() => BulkUploadTypeEntity) @JoinColumn({ name: 'bulk_type_id' }) bulk_type: BulkUploadTypeEntity;

    @ManyToOne(() => BulkUploadColumnEntity) @JoinColumn({ name: 'reference_column_id' }) reference_column: BulkUploadColumnEntity;
}
