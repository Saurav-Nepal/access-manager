import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BulkDefinitionEntity } from '../entities/bulk.definition.entity';
@Injectable()
export class BulkDefinitionJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('7ab31de7bb789023df411ea5b9033a16');
    }
    async handle(evt: DatabaseEventDto<BulkDefinitionEntity>) {
        return evt.entity;
    }
}
