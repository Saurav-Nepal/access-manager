import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { CustomReportEntity } from '../entities/custom.report.entity';
@Injectable()
export class CustomReportJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('8b3d598688b3d4111694c0e07c6294b7');
    }
    async handle(evt: DatabaseEventDto<CustomReportEntity>) {}
}
