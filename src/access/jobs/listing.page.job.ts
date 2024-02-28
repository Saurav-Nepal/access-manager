import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ListingPageEntity } from '../entities/listing.page.entity';
@Injectable()
export class ListingPageJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('b71428a675fb7ea36eb9fcb108af209a');
    }
    async handle(evt: DatabaseEventDto<ListingPageEntity>) {
        return evt.entity;
    }
}
