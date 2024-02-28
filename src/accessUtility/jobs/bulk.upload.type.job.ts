import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BulkUploadTypeEntity } from '../entities/bulk.upload.type.entity';
@Injectable()
export class BulkUploadTypeJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('b18f0d1dd2bec92c1fbc6a07a9ac6d33');
    }
    async handle(evt: DatabaseEventDto<BulkUploadTypeEntity>) {
        return evt.entity;
    }
}
