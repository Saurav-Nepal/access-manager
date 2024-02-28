import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ModuleEntity } from '../entities/module.entity';
@Injectable()
export class ModuleJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('3e04a5e072f260549c3acc6efff7c1f9');
    }
    async handle(evt: DatabaseEventDto<ModuleEntity>) {}
}
