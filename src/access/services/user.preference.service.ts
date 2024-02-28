import { Injectable } from '@nestjs/common';
import { UserPreferenceEntity } from '../entities/user.preference.entity';

@Injectable()
export class UserPreferenceService {
    async updateUserPreference(business_id: number, user_id: number, product_id: number, updateField: string, name: string) {
        const r = await UserPreferenceEntity.firstOrNew({ business_id, user_id, product_id, name });

        r.preference = { ...r.preference };
        r.preference[updateField] = true;

        await r.save();
    }
}
