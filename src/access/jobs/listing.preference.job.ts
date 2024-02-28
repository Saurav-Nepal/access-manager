import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ListingPreferenceEntity } from '../entities/listing.preference.entity';
@Injectable()
export class ListingPreferenceJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('7c6db82c4cae6129f613fb012e06fe6a');
    }
    async handle(evt: DatabaseEventDto<ListingPreferenceEntity>) {
        return evt.entity;
    }
}
