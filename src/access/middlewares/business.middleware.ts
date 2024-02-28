import { Injectable, NestMiddleware } from '@nestjs/common';
import { Auth, NoLoggedUserException } from '@servicelabsco/nestjs-utility-services';
import { BusinessUserRoleService } from '../services/business.user.role.service';

/**
 * middleware to tackle internal server calls
 * @export
 * @class BusinessMiddleware
 * @implements {NestMiddleware}
 */
@Injectable()
export class BusinessMiddleware implements NestMiddleware {
    /**
     * Creates an instance of BusinessMiddleware.
     * @memberof BusinessMiddleware
     */
    constructor(private readonly businessUserRoleService: BusinessUserRoleService) {}

    /**
     * default function to check for the bearer token
     * @param {*} req
     * @param {Response} res
     * @param {Function} next
     * @returns {Promise<Function>}
     * @memberof BusinessMiddleware
     */
    // tslint:disable-next-line: ban-types
    // eslint-disable-next-line @typescript-eslint/ban-types
    // tslint:disable-next-line: ban-types
    async use(req: any, res: Response, next: Function) {
        if (!Auth.check()) {
            throw new NoLoggedUserException();
        }

        const user = Auth.user();
        const businessId = user?.auth_attributes?.business_id;

        if (!businessId) return next();
        if (isNaN(businessId)) return next();

        const roles = await this.businessUserRoleService.getUserRoles(+businessId, user.id);

        user.roles = roles.roles;
        user.role_identifiers = roles.role_identifiers;

        Auth.login(user);

        next();
    }
}
