import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BulkDefinitionProcessingEntity } from '../entities/bulk.definition.processing.entity';
@Injectable()
export class BulkDefinitionProcessingJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('a9ee15e9a3abc5411671a79233e5f4ed');
    }
    async handle(evt: DatabaseEventDto<BulkDefinitionProcessingEntity>) {
        return evt.entity;
    }
}
