import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AccessBusinessParamDto } from '../dtos/access.business.param.dto';
import { AccessBusinessService } from '../services/access.business.service';
import { UserPreferenceEntity } from '../entities/user.preference.entity';
import { Auth } from '@servicelabsco/nestjs-utility-services';
import { AddUserPreferenceDto } from '../dtos/add.user.preference.dto';

/**
 * create controller for UserPreference
 * @export
 * @class UserPreferenceController
 */
@Controller('api/b/user-preference')
export class UserPreferenceController {
    constructor(private readonly accessBusinessService: AccessBusinessService) {}

    @Get()
    async get() {
        const business = await this.accessBusinessService.validateAccess();
        const user = Auth.user();

        return UserPreferenceEntity.find({ where: { user_id: user.id, business_id: business.id, product_id: user.auth_attributes.product_id } });
    }

    @Get(':slug')
    async show(@Param() params: AccessBusinessParamDto) {
        const business = await this.accessBusinessService.validateAccess();
        const user = Auth.user();

        return UserPreferenceEntity.findOne({
            where: { name: params.slug, business_id: business.id, user_id: user.id, product_id: user.auth_attributes.product_id },
        });
    }

    @Post(':slug')
    async create(@Param() params: AccessBusinessParamDto, @Body() body: AddUserPreferenceDto) {
        const business = await this.accessBusinessService.validateAccess();
        const user = Auth.user();

        const r = await UserPreferenceEntity.firstOrNew({
            business_id: business.id,
            user_id: user.id,
            product_id: user.auth_attributes.product_id,
            name: params.slug.toLocaleLowerCase(),
        });

        r.preference = body.preference;

        return r.save();
    }
}
