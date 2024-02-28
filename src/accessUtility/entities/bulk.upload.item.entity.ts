import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BulkUploadEntity } from './bulk.upload.entity';
import { BulkUploadTypeEntity } from './bulk.upload.type.entity';

/**
 * entity definition against the utl_bulk_upload_items table
 * @export
 * @class BulkUploadItemEntity
 * @extends {CommonEntity}
 */
@Entity('utl_bulk_upload_items')
export class BulkUploadItemEntity extends CommonEntity {
    @Column()
    bulk_upload_id: number;

    @Column()
    type_id: number;

    @Column()
    sheet: string;

    @Column()
    row_num: number;

    @Column('json')
    data: any;

    @Column('json')
    error: any;

    @Column()
    errors_count: number;

    @Column()
    processed_at: Date;

    @Column('json')
    attributes: any;

    /** all related methods to go below this */
    @ManyToOne(() => BulkUploadEntity) @JoinColumn({ name: 'bulk_upload_id' }) bulk_upload: BulkUploadEntity;

    @ManyToOne(() => BulkUploadTypeEntity) @JoinColumn({ name: 'type_id' }) type: BulkUploadTypeEntity;
}
