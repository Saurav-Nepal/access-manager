import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BulkDefinitionLoadEntity } from '../entities/bulk.definition.load.entity';
@Injectable()
export class BulkDefinitionLoadJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('8ce26039566d9037a5281a602f2498b0');
    }
    async handle(evt: DatabaseEventDto<BulkDefinitionLoadEntity>) {
        return evt.entity;
    }
}
