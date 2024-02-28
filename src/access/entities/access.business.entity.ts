import { CommonEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

/**
 * entity definition against the bz_business_details table
 * @export
 * @class AccessBusinessEntity
 * @extends {CommonEntity}
 */
@Entity('bz_business_details')
export class AccessBusinessEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    owner_id: number;

    @Column()
    identifier: number;

    @Column()
    active: boolean;

    @Column()
    meta_server_id: number;

    /** all related methods to go below this */
    @ManyToOne(() => UserEntity) @JoinColumn({ name: 'owner_id' }) owner: UserEntity;
}
