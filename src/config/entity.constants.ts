import { AccessBusinessEntity } from '../access/entities/access.business.entity';
import { BusinessGroupRoleEntity } from '../access/entities/business.group.role.entity';
import { BusinessPreferenceEntity } from '../access/entities/business.preference.entity';
import { BusinessUserEntity } from '../access/entities/business.user.entity';
import { BusinessUserGroupEntity } from '../access/entities/business.user.group.entity';
import { BusinessUserRoleEntity } from '../access/entities/business.user.role.entity';
import { ChildMenuEntity } from '../access/entities/child.menu.entity';
import { CustomReportEntity } from '../access/entities/custom.report.entity';
import { DashboardComponentEntity } from '../access/entities/dashboard.component.entity';
import { DashboardEntity } from '../access/entities/dashboard.entity';
import { GroupMemberEntity } from '../access/entities/group.member.entity';
import { GroupRoleEntity } from '../access/entities/group.role.entity';
import { ListPreferenceEntity } from '../access/entities/list.preference.entity';
import { ListingColumnEntity } from '../access/entities/listing.column.entity';
import { ListingPageEntity } from '../access/entities/listing.page.entity';
import { ListingPreferenceEntity } from '../access/entities/listing.preference.entity';
import { MenuActionEntity } from '../access/entities/menu.action.entity';
import { MenuEntity } from '../access/entities/menu.entity';
import { MenuRoleEntity } from '../access/entities/menu.role.entity';
import { ModuleEntity } from '../access/entities/module.entity';
import { ModuleMenuEntity } from '../access/entities/module.menu.entity';
import { PreferenceUserEntity } from '../access/entities/preference.user.entity';
import { PreferenceUserGroupEntity } from '../access/entities/preference.user.group.entity';
import { ProductEntity } from '../access/entities/product.entity';
import { RoleGroupEntity } from '../access/entities/role.group.entity';
import { UiActionEntity } from '../access/entities/ui.action.entity';
import { UiActionRoleEntity } from '../access/entities/ui.action.role.entity';
import { UserPreferenceEntity } from '../access/entities/user.preference.entity';
import { UserRoleEntity } from '../access/entities/user.role.entity';
import { BulkDefinitionEntity } from '../accessUtility/entities/bulk.definition.entity';
import { BulkDefinitionLoadEntity } from '../accessUtility/entities/bulk.definition.load.entity';
import { BulkDefinitionProcessingEntity } from '../accessUtility/entities/bulk.definition.processing.entity';
import { BulkUploadColumnEntity } from '../accessUtility/entities/bulk.upload.column.entity';
import { BulkUploadEntity } from '../accessUtility/entities/bulk.upload.entity';
import { BulkUploadItemEntity } from '../accessUtility/entities/bulk.upload.item.entity';
import { BulkUploadTypeEntity } from '../accessUtility/entities/bulk.upload.type.entity';
import { DataMappingEntity } from '../accessUtility/entities/data.mapping.entity';
import { ListingModelEntity } from '../accessUtility/entities/listing.model.entity';
import { TagAssignmentEntity } from '../accessUtility/entities/tag.assignment.entity';

const entityConstants = {
    '65e0e6d5c92cbba596ecaf851b586389': AccessBusinessEntity,
    '21e0c3b1d90ae9faa0dc0857a0cbf351': BusinessGroupRoleEntity,
    '5d4d889f8f5bd4a2dfca3cb6e0ee2360': BusinessPreferenceEntity,
    f140008ee5cd24094504c17ec2bdb681: BusinessUserEntity,
    a699176389a8f376116bc1adc00df79c: BusinessUserGroupEntity,
    db2456e356ed67bad6d4d1b02760663e: BusinessUserRoleEntity,
    '70d7e2ccf454713ab4774a37daf4188d': ChildMenuEntity,
    '5ac0953e4565c548f1e16dd056801fc3': CustomReportEntity,
    '928d3e3bf036a18950ca1f099f25e374': DashboardComponentEntity,
    cb3277c9b0177cb369d162e6785c68b2: DashboardEntity,
    '20f23c4fb23ea7e31f1db48bb44fe1e6': GroupMemberEntity,
    '9757c354b6a42e5de9e21593a75b77d8': GroupRoleEntity,
    '91aaebde27f2d32ade69bff5b2b125cf': ListPreferenceEntity,
    '5d110fc01af01276ac8e191ea354050d': ListingColumnEntity,
    '8d740fe9deb9e9ac95a9289a6d18c7ff': ListingPageEntity,
    bba85a08ec7d885c1db4330a0028b11a: ListingPreferenceEntity,
    '62eb666cea4a5f270a7d6e1cb8c8c9b3': MenuActionEntity,
    '5dece2a2a80521fd22e32505a75e40a3': MenuEntity,
    '57f3b627d3d22c02a5cb2585afb0713c': MenuRoleEntity,
    '50c5d69fc74f2d7157acd1f6629ccb03': ModuleEntity,
    '17ed83f6929e5c58a37357153b82e61f': ModuleMenuEntity,
    b0f9910e8e80fe0a04380fbc7bd9bcaf: PreferenceUserEntity,
    '0281d0bcca066ad6a61f1eeae81c40dd': PreferenceUserGroupEntity,
    '84c30d0701d352a4435904a05cc018c4': ProductEntity,
    '6e61f45b585911c9b7aeb6dd9723adf2': RoleGroupEntity,
    '032b5b69fb3bb1932e431c946a38d5e2': UiActionEntity,
    '5a7cee7ff3b8db1685f34eb599fc0f1e': UiActionRoleEntity,
    '0c52a732ac1a3d79a48d5706ac8254f6': UserPreferenceEntity,
    '04e801c3e17dd4d1d958265e1d8b86a7': UserRoleEntity,
    a213870c8e9975209360aa1dc36b4533: BulkDefinitionEntity,
    '2d3a15f6a03b1c429768dd7fe84d1841': BulkDefinitionLoadEntity,
    bec4e64646dab8617810fa81f9f14f08: BulkDefinitionProcessingEntity,
    eb89ef189608f01d40334dc71e2d956d: BulkUploadColumnEntity,
    '7e79960612c97508494a5bfd6db846e2': BulkUploadEntity,
    f0d9555accac3da32f711763c15e240d: BulkUploadItemEntity,
    f980022f844962d06e05e868efdf2e28: BulkUploadTypeEntity,
    '47254c0bb02039dd781f40cd09bf1486': DataMappingEntity,
    f398df3b81975969eb65eaabc46fb719: ListingModelEntity,
    '1b155ffbd5998294415345bd380131d6': TagAssignmentEntity,
};

export = entityConstants;
