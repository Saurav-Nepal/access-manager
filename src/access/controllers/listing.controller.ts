import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OperationException } from '@servicelabsco/nestjs-utility-services';
import { AccessBusinessParamDto } from '../dtos/access.business.param.dto';
import { AddListingPreferenceDto } from '../dtos/add.listing.preference.dto';
import { ListingColumnEntity } from '../entities/listing.column.entity';
import { ListingPageEntity } from '../entities/listing.page.entity';
import { AccessBusinessService } from '../services/access.business.service';
import { ListingService } from '../services/listing.service';

@Controller('api/b/listing-page')
export class ListingController {
    constructor(
        private readonly businessAccessService: AccessBusinessService,
        private readonly listingService: ListingService
    ) {}

    @Get(':slug')
    async get(@Param() params: AccessBusinessParamDto) {
        const validation = await this.validate(params.slug);

        return this.listingService.get(validation.listing, validation.business);
    }

    @Post(':slug')
    async create(@Param() params: AccessBusinessParamDto, @Body() body: AddListingPreferenceDto) {
        const validation = await this.validate(params.slug);

        return this.listingService.savePreference(validation.listing, validation.business, body);
    }

    @Delete(':slug/:id')
    async deletePreference(@Param() params: AccessBusinessParamDto) {
        const validation = await this.validate(params.slug);

        return this.listingService.delete(validation.listing, params.id);
    }

    @Post(':slug/default')
    async setDefaultColumn(@Param() params: AccessBusinessParamDto, @Body() body: any) {
        const { listing } = await this.validate(params.slug);

        for await (const column of body) {
            const definition = await ListingColumnEntity.firstOrNew({
                listing_id: listing.id,
                identifier: column.key,
            });

            definition.default = true;
            definition.save();
        }

        return { success: true };
    }

    private async validate(identifier: string) {
        if (!identifier) throw new OperationException('invalid request');

        const business = await this.businessAccessService.validateAccess();
        const listing = await ListingPageEntity.findOne({ where: { identifier } });

        if (!listing) throw new OperationException(`No such listing was found`);

        return { business, listing };
    }
}
