import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccessBusinessParamDto } from '../dtos/access.business.param.dto';
import { AddBusinessPreferenceDto } from '../dtos/add.business.preference.dto';
import { BusinessPreferenceEntity } from '../entities/business.preference.entity';
import { AccessBusinessService } from '../services/access.business.service';

@Controller('api/b/business-preference')
export class BusinessPreferenceController {
    constructor(private readonly accessBusinessService: AccessBusinessService) {}

    @Get()
    async get() {
        const business = await this.accessBusinessService.validateAccess();

        return BusinessPreferenceEntity.find({ where: { business_id: business.id } });
    }

    @Get(':slug')
    async show(@Param() params: AccessBusinessParamDto) {
        const business = await this.accessBusinessService.validateAccess();

        return BusinessPreferenceEntity.findOne({ where: { name: params.slug, business_id: business.id } });
    }

    @Post(':slug')
    async create(@Param() params: AccessBusinessParamDto, @Body() body: AddBusinessPreferenceDto) {
        const business = await this.accessBusinessService.validateAccess();

        const r = await BusinessPreferenceEntity.firstOrNew({ business_id: business.id, name: params.slug.toLowerCase() });

        r.preference = body.preference;

        return r.save();
    }
}
