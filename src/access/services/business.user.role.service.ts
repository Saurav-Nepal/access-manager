import { Injectable } from '@nestjs/common';
import { CacheService, ClassMapper, SqlService, UserRolesAccessObjectDto } from '@servicelabsco/nestjs-utility-services';
import { addMinutes } from 'date-fns';

@Injectable()
export class BusinessUserRoleService {
    constructor(
        private readonly sqlService: SqlService,
        private readonly cacheService: CacheService
    ) {}

    async getUserRoles(businessId: number, userId: number): Promise<UserRolesAccessObjectDto> {
        const identifier = `business.${businessId}.user.${userId}.roles`;
        const data = await this.cacheService.get(identifier, null);

        if (data) return data;

        return this.setUserRoles(businessId, userId);
    }

    private async fetchUserRoles(businessId: number, userId: number) {
        const sql = `select b.id, b.identifier from bz_user_roles a, sys_roles b where a.deleted_at is null and a.role_id = b.id and a.business_id = ${businessId} and a.user_id = ${userId}`;

        return this.sqlService.sql(sql);
    }

    async setUserRoles(businessId: number, userId: number): Promise<UserRolesAccessObjectDto> {
        const identifier = `business.${businessId}.user.${userId}.roles`;

        const r = await this.fetchUserRoles(businessId, userId);

        const roles = ClassMapper.extractNumber('id', r);
        const role_identifiers = ClassMapper.extract('identifier', r);

        const d = { roles, role_identifiers };

        await this.cacheService.set(identifier, d, addMinutes(new Date(), 15));

        return d;
    }
}
