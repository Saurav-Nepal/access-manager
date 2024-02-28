import { CommonAttributesDto } from '@servicelabsco/nestjs-utility-services';
export class BusinessUserGroupAttributesDto extends CommonAttributesDto {
    members?: number;
    roles?: number;
}
