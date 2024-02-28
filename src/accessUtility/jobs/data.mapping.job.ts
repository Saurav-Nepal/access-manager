import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { DataMappingEntity } from '../entities/data.mapping.entity';
@Injectable()
export class DataMappingJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('518c9259f8a996051ef1a8dcdd5b5498');
    }
    async handle(evt: DatabaseEventDto<DataMappingEntity>) {
        return evt.entity;
    }
}
