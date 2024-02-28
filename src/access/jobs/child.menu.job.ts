import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ChildMenuEntity } from '../entities/child.menu.entity';
@Injectable()
export class ChildMenuJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('589559e61985b6f208ec30499776da52');
    }
    async handle(evt: DatabaseEventDto<ChildMenuEntity>) {}
}
