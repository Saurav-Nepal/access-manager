import { AccessException, AccessService, Auth } from '@servicelabsco/nestjs-utility-services';
import { In, IsNull, Not } from 'typeorm';
import { ProcessCommonData } from '../../accessUtility/libraries/process.common.data';
import { AddListingPreferenceDto } from '../dtos/add.listing.preference.dto';
import { AccessBusinessEntity } from '../entities/access.business.entity';
import { BusinessUserEntity } from '../entities/business.user.entity';
import { BusinessUserGroupEntity } from '../entities/business.user.group.entity';
import { ListingPageEntity } from '../entities/listing.page.entity';
import { ListingPreferenceEntity } from '../entities/listing.preference.entity';
import { PreferenceUserEntity } from '../entities/preference.user.entity';
import { PreferenceUserGroupEntity } from '../entities/preference.user.group.entity';
import { ListingPreferenceService } from '../services/listing.preference.service';

export class ProcessPreferenceData extends ProcessCommonData {
    /**
     * payload for preference data
     * @protected
     * @type {AddListingPreferenceDto}
     */
    protected payload: AddListingPreferenceDto;

    /**
     * preference entity
     * @private
     * @type {ListingPreferenceEntity}
     */
    private preference: ListingPreferenceEntity;

    /**
     * Creates an instance of ProcessPreferenceData.
     * @param {ListingPreferenceService} listingPreferenceService
     * @param {AccessService} accessService
     * @param {ListingPageEntity} listing
     * @memberof ProcessPreferenceData
     */
    constructor(
        protected readonly listingPreferenceService: ListingPreferenceService,
        protected readonly accessService: AccessService,
        protected readonly listing: ListingPageEntity,
        protected readonly business: AccessBusinessEntity
    ) {
        super();
    }

    async process(payload: AddListingPreferenceDto) {
        this.payload = payload;

        // validate payload
        await this.validate();

        // set the preference
        await this.set();

        return this.preference;
    }

    private async set() {
        const payload = this.payload;

        let preference = ListingPreferenceEntity.create({ business_id: this.business.id });
        if (payload.id) preference = await ListingPreferenceEntity.first(payload.id);

        if (preference.business_id !== this.business.id) throw new AccessException();

        preference.listing_id = this.listing.id;
        preference.identifier = payload.identifier || 'default';
        preference.column_definition = payload.column_definition;
        preference.query_definition = payload.query_definition;
        preference.is_favourite = payload.is_favourite;

        const user = Auth.user();
        preference.user_id = user.id;

        if (payload.is_global && this.listingPreferenceService.canSetGlobal()) preference.user_id = null;
        await preference.save();

        this.payload.id = preference.id;
        this.preference = preference;

        await this.processUsers();
        await this.processUserGroups();
    }

    private async processUsers() {
        const ids: number[] = [];

        if (this.payload.user_ids)
            for (const id of this.payload.user_ids) {
                const r = await PreferenceUserEntity.firstOrCreate({ user_id: id, preference_id: this.preference.id });

                ids.push(r.id);
            }

        return PreferenceUserEntity.softDelete({ preference_id: this.preference.id, id: Not(In(ids)) });
    }

    private async processUserGroups() {
        const ids: number[] = [];

        if (this.payload.group_ids)
            for (const groupId of this.payload.group_ids) {
                const r = await PreferenceUserGroupEntity.firstOrCreate({ user_group_id: groupId, preference_id: this.preference.id });

                ids.push(r.id);
            }

        return PreferenceUserGroupEntity.softDelete({ preference_id: this.preference.id, id: Not(In(ids)) });
    }

    private async validate() {
        await this.validateDuplicateIdentifier();
        await this.validateCreator();
        await this.validateUsers();
        await this.validateUserGroups();

        this.throwExceptionOnError();
    }

    private async validateDuplicateIdentifier() {
        const user = Auth.user();

        const user_id = this.payload.is_global ? IsNull() : user.id;

        const r = await ListingPreferenceEntity.findOne({
            where: {
                business_id: this.business.id,
                identifier: this.payload.identifier,
                listing_id: this.listing.id,
                user_id,
            },
        });

        if ((r && this.payload.id && r.id !== this.payload.id) || (r && !this.payload.id))
            return this.setColumnError('identifier', 'Preference with that identifier already exists');
    }

    private async validateUsers() {
        if (!this.payload.user_ids) return;

        for (const id of this.payload.user_ids) {
            const d = await BusinessUserEntity.findOne({ where: { business_id: this.business.id, user_id: id } });
            if (!d) return this.setColumnError('user_ids', 'user doesnt belong to this organization');
        }
    }

    private async validateUserGroups() {
        if (!this.payload.group_ids) return;

        for (const id of this.payload.group_ids) {
            const d = await BusinessUserGroupEntity.findOne({ where: { business_id: this.business.id, id: id } });
            if (!d) return this.setColumnError('group_ids', 'Group doesnt belong to this organization');
        }
    }

    private async validateCreator() {
        const user = Auth.user();
        if (!user) throw new AccessException();

        if (!this.payload.id) return;

        const preference = await ListingPreferenceEntity.findOne({
            where: { listing_id: this.listing.id, id: this.payload.id, created_by: user.id },
        });

        if (!preference) throw new AccessException('You cannot perform this operation');

        this.preference = preference;
    }
}
