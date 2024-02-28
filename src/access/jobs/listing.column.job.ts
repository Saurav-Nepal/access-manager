import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ListingColumnEntity } from '../entities/listing.column.entity';
@Injectable()
export class ListingColumnJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('378591108560f65a7880f5bf5d1594b8');
    }
    async handle(evt: DatabaseEventDto<ListingColumnEntity>) {
        return evt.entity;
    }
}
