import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BulkUploadColumnEntity } from '../entities/bulk.upload.column.entity';
@Injectable()
export class BulkUploadColumnJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('b7f89dc40006565730879d2c2ff84eaa');
    }
    async handle(evt: DatabaseEventDto<BulkUploadColumnEntity>) {
        return evt.entity;
    }
}
