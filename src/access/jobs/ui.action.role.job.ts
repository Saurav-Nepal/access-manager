import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { UiActionRoleEntity } from '../entities/ui.action.role.entity';
@Injectable()
export class UiActionRoleJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('0c812ceb276252bca70289acf23b2197');
    }
    async handle(evt: DatabaseEventDto<UiActionRoleEntity>) {}
}
