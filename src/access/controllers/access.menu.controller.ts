import { Controller, Get, Param } from '@nestjs/common';
import { AccessService, CacheService, OperationException } from '@servicelabsco/nestjs-utility-services';
import { AccessBusinessParamDto } from '../dtos/access.business.param.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProcessApplicationMenu } from '../libraries/process.application.menu';
import { ProcessMenuDetails } from '../libraries/process.menu.details';

@Controller('api/product/:id/menu')
export class AccessMenuController {
    constructor(
        private readonly cacheService: CacheService,
        private readonly accessService: AccessService
    ) {}

    @Get()
    async get(@Param() params: AccessBusinessParamDto) {
        const product = await ProductEntity.first(params.id);
        if (!product) throw new OperationException(`No menu found for the given product`);

        return new ProcessApplicationMenu(this.cacheService, this.accessService).process(params.id);
    }

    @Get(':second_id')
    async getMenuDetails(@Param() params: AccessBusinessParamDto) {
        return new ProcessMenuDetails(this.accessService).process(params.second_id);
    }
}
