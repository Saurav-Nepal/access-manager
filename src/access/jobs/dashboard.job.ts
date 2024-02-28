import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { DashboardEntity } from '../entities/dashboard.entity';
@Injectable()
export class DashboardJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('602b37b1d7d36da5bf800ed3fdb23fe5');
    }
    async handle(evt: DatabaseEventDto<DashboardEntity>) {}
}
