import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BulkUploadItemEntity } from '../entities/bulk.upload.item.entity';
@Injectable()
export class BulkUploadItemJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('abe18c2c192a1958f8bcb97de4af8ab8');
    }
    async handle(evt: DatabaseEventDto<BulkUploadItemEntity>) {
        return evt.entity;
    }
}
