import { Injectable } from '@nestjs/common';
import { AccessException, AccessService, Auth, SqlService } from '@servicelabsco/nestjs-utility-services';
import { AccessBusinessEntity } from '../entities/access.business.entity';
import { ListingPageEntity } from '../entities/listing.page.entity';
import { ListingPreferenceEntity } from '../entities/listing.preference.entity';
import { PreferenceUserEntity } from '../entities/preference.user.entity';
import { PreferenceUserGroupEntity } from '../entities/preference.user.group.entity';

@Injectable()
export class ListingPreferenceService {
    constructor(
        private readonly accessService: AccessService,
        private readonly sqlService: SqlService
    ) {}

    async get(listing: ListingPageEntity, business: AccessBusinessEntity) {
        const user = Auth.user();

        const sql = `select * from utl_listing_preferences a where a.deleted_at is null and a.listing_id = ${listing.id} and a.business_id = ${business.id} and ((a.user_id = ${user.id} or a.user_id is null) or exists (select 1 from utl_preference_users b where a.id = b.preference_id and b.user_id = ${user.id} and b.deleted_at is null) or exists (select 1 from utl_preference_user_groups c, bz_user_groups d, bz_group_members e where a.id = c.preference_id and c.deleted_at is null and d.deleted_at is null and e.deleted_at is null and c.user_group_id = d.id and d.id = e.group_id and e.user_id = ${user.id} ))`;

        return this.sqlService.read(sql);
    }

    async delete(listing: ListingPageEntity, preferenceId: number) {
        const preference = await ListingPreferenceEntity.findOne({ where: { listing_id: listing.id, id: preferenceId } });

        if (!preference) throw new AccessException();

        const user = Auth.user();
        if (preference.created_by !== user.id) throw new AccessException(`You cannot drop this preference`);

        return preference.softDelete();
    }

    async makeGlobal(listing: ListingPageEntity, preferenceId: number) {
        const preference = await ListingPreferenceEntity.findOne({ where: { listing_id: listing.id, id: preferenceId } });

        if (!preference) throw new AccessException();

        if (!this.canSetGlobal()) throw new AccessException('You cannot make this preference global');

        preference.user_id = null;

        return preference.save();
    }

    async makePersonal(listing: ListingPageEntity, preferenceId: number) {
        const preference = await ListingPreferenceEntity.findOne({ where: { listing_id: listing.id, id: preferenceId } });

        if (!preference) throw new AccessException();

        const user = Auth.user();

        if (preference.created_by !== user.id) throw new AccessException('You cannot make this preference personal');

        preference.user_id = user.id;

        return preference.save();
    }

    async makeFavourite(listing: ListingPageEntity, preferenceId: number) {
        const preference = await ListingPreferenceEntity.findOne({ where: { listing_id: listing.id, id: preferenceId } });

        if (!preference) throw new AccessException();

        preference.is_favourite = true;

        return preference.save();
    }

    async removeFavourite(listing: ListingPageEntity, preferenceId: number) {
        const preference = await ListingPreferenceEntity.findOne({ where: { listing_id: listing.id, id: preferenceId } });

        if (!preference) throw new AccessException();

        preference.is_favourite = false;

        return preference.save();
    }

    async getSharedUsersAndUserGroups(listing: ListingPageEntity, prefereneId: number) {
        const preference = await ListingPreferenceEntity.findOne({ where: { listing_id: listing.id, id: prefereneId } });

        if (!preference) throw new AccessException();

        const users = await PreferenceUserEntity.find({ where: { preference_id: preference.id }, relations: ['user'] });

        const groups = await PreferenceUserGroupEntity.find({ where: { preference_id: preference.id }, relations: ['user_group'] });

        return { users, groups };
    }

    canSetGlobal() {
        return this.accessService.hasRoleIdentifier('ua_listing_overrider');
    }
}
