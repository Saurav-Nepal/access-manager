import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { MenuRoleEntity } from '../entities/menu.role.entity';
@Injectable()
export class MenuRoleJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('c7109751849caa0e0c506ca9567b5095');
    }
    async handle(evt: DatabaseEventDto<MenuRoleEntity>) {}
}
