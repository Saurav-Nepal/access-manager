import { CommonSubscriber } from '@servicelabsco/nestjs-utility-services';
import { DataSource, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductJob } from '../jobs/product.job';
@EventSubscriber()
export class ProductSubscriber extends CommonSubscriber<ProductEntity> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly productJob: ProductJob
    ) {
        super();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return ProductEntity;
    }
    async afterInsert(event: InsertEvent<ProductEntity>) {
        await this.productJob.delayedDispatch(this.getEventData(event));
    }

    async afterUpdate(event: UpdateEvent<ProductEntity>) {
        await this.productJob.delayedDispatch(this.getEventData(event));
    }
}
