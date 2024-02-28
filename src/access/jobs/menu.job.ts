import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { MenuEntity } from '../entities/menu.entity';
@Injectable()
export class MenuJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('f13222badfad6a49064a0c9f22c98299');
    }
    async handle(evt: DatabaseEventDto<MenuEntity>) {}
}
