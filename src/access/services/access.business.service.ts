import { Injectable } from '@nestjs/common';
import { AccessException, Auth } from '@servicelabsco/nestjs-utility-services';
import { AccessBusinessEntity } from '../entities/access.business.entity';

@Injectable()
export class AccessBusinessService {
    async validateAccess(): Promise<AccessBusinessEntity> {
        const user = Auth.user();

        const businessId = user?.auth_attributes?.business_id;
        if (!businessId) throw new AccessException();

        const business = await AccessBusinessEntity.findOne({ where: { id: businessId } });
        if (!business) throw new AccessException();

        return business;
    }
}
