import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ModuleMenuEntity } from '../entities/module.menu.entity';
@Injectable()
export class ModuleMenuJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('447c2a2defb0e76e97cd8a83503e0df2');
    }
    async handle(evt: DatabaseEventDto<ModuleMenuEntity>) {}
}
