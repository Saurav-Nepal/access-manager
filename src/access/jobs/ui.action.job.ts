import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { UiActionEntity } from '../entities/ui.action.entity';
@Injectable()
export class UiActionJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('7e7d83369da7953ef5749c629446db5e');
    }
    async handle(evt: DatabaseEventDto<UiActionEntity>) {}
}
