import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { PreferenceUserEntity } from '../entities/preference.user.entity';

@Injectable()
export class PreferenceUsersJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('5e4290185523173053f4c2bd2d6f781a');
    }
    async handle(evt: DatabaseEventDto<PreferenceUserEntity>) {
        return evt.entity;
    }
}
