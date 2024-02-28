import { Injectable } from '@nestjs/common';
import { AccessException, AccessService, Auth, SqlService } from '@servicelabsco/nestjs-utility-services';
import { IsNull } from 'typeorm';
import { AddListingPreferenceDto } from '../dtos/add.listing.preference.dto';
import { AccessBusinessEntity } from '../entities/access.business.entity';
import { ListingColumnEntity } from '../entities/listing.column.entity';
import { ListingPageEntity } from '../entities/listing.page.entity';
import { ListingPreferenceEntity } from '../entities/listing.preference.entity';

@Injectable()
export class ListingService {
    constructor(
        private readonly accessService: AccessService,
        private readonly sqlService: SqlService
    ) {}

    async savePreference(listing: ListingPageEntity, business: AccessBusinessEntity, payload: AddListingPreferenceDto) {
        if (payload.is_global && this.canSetGlobal()) return this.saveGlobalPreference(listing, business, payload);

        const user = Auth.user();
        const preference = await ListingPreferenceEntity.firstOrNew({
            listing_id: listing.id,
            business_id: business.id,
            user_id: user.id,
            identifier: payload.identifier,
        });

        preference.column_definition = payload.column_definition;
        preference.query_definition = payload.query_definition;

        return preference.save();
    }

    private async saveGlobalPreference(listing: ListingPageEntity, business: AccessBusinessEntity, payload: AddListingPreferenceDto) {
        const identifier = payload.identifier || 'default';

        const preference = await ListingPreferenceEntity.firstOrNew({
            listing_id: listing.id,
            business_id: business.id,
            identifier,
            user_id: IsNull(),
        });

        preference.column_definition = payload.column_definition;
        preference.query_definition = payload.query_definition;

        return preference.save();
    }

    async get(listing: ListingPageEntity, business: AccessBusinessEntity) {
        const definition = await ListingColumnEntity.find({
            where: { listing_id: listing.id },
            relations: ['reference_model'],
            order: { priority: 'asc' },
        });

        const user = Auth.user();
        const sql = `select * from utl_listing_preferences a where a.deleted_at is null and a.business_id = ${business.id} and a.listing_id = ${listing.id} and (a.user_id = ${user.id} or a.user_id is null) and a.active = true order by a.identifier asc`;

        const preferences = await this.sqlService.read(sql);

        return { definition, preferences };
    }

    async delete(listing: ListingPageEntity, preferenceId: number) {
        const preference = await ListingPreferenceEntity.findOne({ where: { listing_id: listing.id, id: preferenceId } });

        if (!preference) throw new AccessException();

        const user = Auth.user();
        if (preference.user_id !== user.id) throw new AccessException(`You cannot drop this preference`);

        return preference.softDelete();
    }

    private canSetGlobal() {
        if (this.accessService.hasRoleIdentifier('ua_listing_overrider')) return true;

        return false;
    }
}
