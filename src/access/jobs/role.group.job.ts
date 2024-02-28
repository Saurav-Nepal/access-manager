import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { RoleGroupEntity } from '../entities/role.group.entity';
@Injectable()
export class RoleGroupJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('cc942b35323b7ed6158469df81dee73a');
    }
    async handle(evt: DatabaseEventDto<RoleGroupEntity>) {}
}
