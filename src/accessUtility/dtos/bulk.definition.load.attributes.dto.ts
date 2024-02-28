import { CommonAttributesDto } from '@servicelabsco/nestjs-utility-services';
export class BulkDefinitionLoadAttributesDto extends CommonAttributesDto {
    through_queue?: boolean;
}
