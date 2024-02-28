import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { TagAssignmentEntity } from '../entities/tag.assignment.entity';
@Injectable()
export class TagAssignmentJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('83d1f1a159cc83a0f7530050be74a2dc');
    }
    async handle(evt: DatabaseEventDto<TagAssignmentEntity>) {
        return evt.entity;
    }
}
