import { Injectable } from '@nestjs/common';
import { CacheService, DatabaseEventDto } from '@servicelabsco/nestjs-utility-services';
import { BusinessPreferenceEntity } from '../entities/business.preference.entity';

@Injectable()
export class BusinessPreferenceService {
    constructor(private readonly cacheService: CacheService) {}
    async updateBusinessPreference(evt: DatabaseEventDto<any>, updateField: string) {
        if (evt.databaseEntity?.id) return;

        const r = await BusinessPreferenceEntity.firstOrNew({ business_id: evt.entity.business_id, name: 'onboarding.status' });

        r.preference = { ...r.preference };
        r.preference[updateField] = true;

        await r.save();
    }

    async getPreference(businessId: number, field: string, defaultValue?: any) {
        const key = `business.${businessId}.preference.${field}`;
        const data = await this.cacheService.get(key);

        if (!data) return this.setDBPreference(businessId, field, defaultValue);
    }

    async setDBPreference(businessId: number, name: string, defaultValue?: any) {
        const key = `business.${businessId}.preference.${name}`;
        const data = await BusinessPreferenceEntity.findOne({ where: { business_id: businessId, name } });

        if (!data) {
            await this.cacheService.delete(key);
            return defaultValue;
        }

        await this.cacheService.set(key, data.preference);
        return data.preference;
    }
}
