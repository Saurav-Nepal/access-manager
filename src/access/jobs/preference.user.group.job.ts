import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { PreferenceUserGroupEntity } from '../entities/preference.user.group.entity';

@Injectable()
export class PreferenceUserGroupJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('ae659d7c00a87bd306d449800b77f9fb');
    }
    async handle(evt: DatabaseEventDto<PreferenceUserGroupEntity>) {
        return evt.entity;
    }
}
