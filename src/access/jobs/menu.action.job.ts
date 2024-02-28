import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { MenuActionEntity } from '../entities/menu.action.entity';
@Injectable()
export class MenuActionJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('9946abff6e87a8549492a9481fe12fb2');
    }
    async handle(evt: DatabaseEventDto<MenuActionEntity>) {}
}
