import { CommonEntity, LookupValueEntity, ModelEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BulkUploadSheetDto } from '../dtos/bulk.upload.sheet.dto';
import { BulkUploadTypeAttributesDto } from '../dtos/bulk.upload.type.attributes.dto';
import { BulkUploadColumnEntity } from './bulk.upload.column.entity';

/**
 * entity definition against the utl_bulk_upload_types table
 * @export
 * @class BulkUploadTypeEntity
 * @extends {CommonEntity}
 */
@Entity('utl_bulk_upload_types')
export class BulkUploadTypeEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    model_id: number;

    @Column()
    source_type: string;

    @Column()
    custom_field_id: number;

    @Column()
    relations: string;

    @Column('json')
    sheet: BulkUploadSheetDto;

    @Column('json')
    attributes: BulkUploadTypeAttributesDto | any;

    /** all related methods to go below this */
    @ManyToOne(() => LookupValueEntity) @JoinColumn({ name: 'custom_field_id' }) custom_field: LookupValueEntity;

    @ManyToOne(() => ModelEntity) @JoinColumn({ name: 'model_id' }) model: ModelEntity;

    @OneToMany(() => BulkUploadColumnEntity, (column) => column.bulk_type) columns: BulkUploadColumnEntity[];
}
