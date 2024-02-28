import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AccessService, OperationException } from '@servicelabsco/nestjs-utility-services';
import { AccessBusinessParamDto } from '../dtos/access.business.param.dto';
import { AddListingPreferenceDto } from '../dtos/add.listing.preference.dto';
import { ListingPageEntity } from '../entities/listing.page.entity';
import { ListingPreferenceEntity } from '../entities/listing.preference.entity';
import { ProcessPreferenceData } from '../libraries/process.preference.data';
import { AccessBusinessService } from '../services/access.business.service';
import { ListingPreferenceService } from '../services/listing.preference.service';

@Controller('api/b/listing-preference')
export class ListingPreferenceController {
    constructor(
        private readonly businessAccessService: AccessBusinessService,
        private readonly listingPreferenceService: ListingPreferenceService,
        private readonly accessService: AccessService
    ) {}

    @Get(':slug')
    async get(@Param() params: AccessBusinessParamDto) {
        const validation = await this.validate(params.slug);

        return this.listingPreferenceService.get(validation.listing, validation.business);
    }

    @Get(':slug/:id')
    async showRecord(@Param() params: AccessBusinessParamDto) {
        await this.validate(params.slug);

        return ListingPreferenceEntity.first(params.id, {
            relations: ['preference_users', 'preference_users.user', 'preference_user_groups', 'preference_user_groups.user_group'],
        });
    }

    @Post(':slug')
    async create(@Param() params: AccessBusinessParamDto, @Body() body: AddListingPreferenceDto) {
        const validation = await this.validate(params.slug);

        return new ProcessPreferenceData(this.listingPreferenceService, this.accessService, validation.listing, validation.business).process(body);
    }

    @Post(':slug/:id/make-global')
    async makeGlobal(@Param() params: AccessBusinessParamDto) {
        const validation = await this.validate(params.slug);

        return this.listingPreferenceService.makeGlobal(validation.listing, params.id);
    }

    @Post(':slug/:id/make-personal')
    async makePersonal(@Param() params: AccessBusinessParamDto) {
        const validation = await this.validate(params.slug);

        return this.listingPreferenceService.makePersonal(validation.listing, params.id);
    }

    @Post(':slug/:id/make-favourite')
    async makeFavourite(@Param() params: AccessBusinessParamDto) {
        const validation = await this.validate(params.slug);

        return this.listingPreferenceService.makeFavourite(validation.listing, params.id);
    }

    @Post(':slug/:id/remove-favourite')
    async removeFavourite(@Param() params: AccessBusinessParamDto) {
        const validation = await this.validate(params.slug);

        return this.listingPreferenceService.removeFavourite(validation.listing, params.id);
    }

    @Delete(':slug/:id')
    async deletePreference(@Param() params: AccessBusinessParamDto) {
        const validation = await this.validate(params.slug);

        return this.listingPreferenceService.delete(validation.listing, params.id);
    }

    private async validate(identifier: string) {
        if (!identifier) throw new OperationException('invalid request');

        const business = await this.businessAccessService.validateAccess();
        const listing = await ListingPageEntity.findOne({ where: { identifier } });

        if (!listing) throw new OperationException(`No such listing was found`);

        return { business, listing };
    }
}
