import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ListingModelEntity } from '../entities/listing.model.entity';
@Injectable()
export class ListingModelJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('02b3275741183ecabec395645cef8415');
    }
    async handle(evt: DatabaseEventDto<ListingModelEntity>) {
        return evt.entity;
    }
}
