import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BusinessPreferenceEntity } from '../entities/business.preference.entity';
@Injectable()
export class BusinessPreferenceJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('b31ffc403925101fb511c12e81892e68');
    }
    async handle(evt: DatabaseEventDto<BusinessPreferenceEntity>) {
        return evt.entity;
    }
}
