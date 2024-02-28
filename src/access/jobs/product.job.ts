import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ProductEntity } from '../entities/product.entity';
@Injectable()
export class ProductJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('380f3258c132c9a6bdcda56024f25fcc');
    }
    async handle(evt: DatabaseEventDto<ProductEntity>) {}
}
