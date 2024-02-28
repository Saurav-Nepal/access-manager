import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { UserPreferenceEntity } from '../entities/user.preference.entity';

@Injectable()
export class UserPreferenceJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('cde37d522acab091e506685644fa3a97');
    }
    async handle(evt: DatabaseEventDto<UserPreferenceEntity>) {
        return evt.entity;
    }
}
