import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { DashboardComponentEntity } from '../entities/dashboard.component.entity';
@Injectable()
export class DashboardComponentJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('e3b7f33d4173dbbdf182ba26d62526cd');
    }
    async handle(evt: DatabaseEventDto<DashboardComponentEntity>) {}
}
