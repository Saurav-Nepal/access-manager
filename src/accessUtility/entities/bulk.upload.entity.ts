import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AccessBusinessEntity } from '../../access/entities/access.business.entity';
import { BulkDefinitionEntity } from './bulk.definition.entity';
import { BulkUploadItemEntity } from './bulk.upload.item.entity';
import { BulkUploadTypeEntity } from './bulk.upload.type.entity';

/**
 * entity definition against the utl_bulk_uploads table
 * @export
 * @class BulkUploadEntity
 * @extends {CommonEntity}
 */
@Entity('utl_bulk_uploads')
export class BulkUploadEntity extends CommonEntity {
    @Column()
    business_id: number;

    @Column()
    source_type: string;

    @Column()
    source_id: number;

    @Column()
    type_id: number;

    @Column()
    file_url: string;

    @Column()
    total_rows: number;

    @Column()
    analysed_rows: number;

    @Column()
    processed_rows: number;

    @Column()
    valid_records: number;

    @Column()
    invalid_records: number;

    @Column()
    processed_at: Date;

    @Column()
    approved_at: Date;

    @Column()
    analysed_at: Date;

    @Column()
    definition_id: number;

    @Column('json')
    stats: any;

    @Column('json')
    attributes: any;

    /** all related methods to go below this */
    @ManyToOne(() => AccessBusinessEntity) @JoinColumn({ name: 'business_id' }) business: AccessBusinessEntity;
    @OneToMany(() => BulkUploadItemEntity, (item) => item.bulk_upload) items: BulkUploadItemEntity[];
    @ManyToOne(() => BulkDefinitionEntity) @JoinColumn({ name: 'definition_id' }) definition: BulkDefinitionEntity;
    @ManyToOne(() => BulkUploadTypeEntity) @JoinColumn({ name: 'type_id' }) type: BulkUploadTypeEntity;
}
