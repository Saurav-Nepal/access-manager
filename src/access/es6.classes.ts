import { AccessMenuController } from './controllers/access.menu.controller';
import { BusinessPreferenceController } from './controllers/business.preference.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { ListingController } from './controllers/listing.controller';
import { ListingPreferenceController } from './controllers/listing.preference.controller';
import { UserPreferenceController } from './controllers/user.preference.controller';
import { AccessBusinessParamDto } from './dtos/access.business.param.dto';
import { AddBusinessPreferenceDto } from './dtos/add.business.preference.dto';
import { AddListingPreferenceDto } from './dtos/add.listing.preference.dto';
import { AddUserPreferenceDto } from './dtos/add.user.preference.dto';
import { BusinessPreferenceAttributesDto } from './dtos/business.preference.attributes.dto';
import { BusinessUserAttributesDto } from './dtos/business.user.attributes.dto';
import { BusinessUserGroupAttributesDto } from './dtos/business.user.group.attributes.dto';
import { BusinessUserRoleAttributesDto } from './dtos/business.user.role.attributes.dto';
import { ChildMenuAttributesDto } from './dtos/child.menu.attributes.dto';
import { CommonListFilterDto } from './dtos/common.list.filter.dto';
import { CustomReportAttributesDto } from './dtos/custom.report.attributes.dto';
import { DashboardAttributesDto } from './dtos/dashboard.attributes.dto';
import { DashboardComponentAttributesDto } from './dtos/dashboard.component.attributes.dto';
import { DateFilterDto } from './dtos/date.filter.dto';
import { DateRangeFilterDto } from './dtos/date.range.filter.dto';
import { GroupMemberAttributesDto } from './dtos/group.member.attributes.dto';
import { GroupRoleAttributesDto } from './dtos/group.role.attributes.dto';
import { ListPreferenceAttributesDto } from './dtos/list.preference.attributes.dto';
import { ListResponseDto } from './dtos/list.response.dto';
import { ListResponseFormatDto } from './dtos/list.response.format.dto';
import { ListingColumnAttributesDto } from './dtos/listing.column.attributes.dto';
import { ListingPageAttributesDto } from './dtos/listing.page.attributes.dto';
import { ListingPreferenceAttributesDto } from './dtos/listing.preference.attributes.dto';
import { MenuActionAttributesDto } from './dtos/menu.action.attributes.dto';
import { MenuAttributesDto } from './dtos/menu.attributes.dto';
import { MenuRoleAttributesDto } from './dtos/menu.role.attributes.dto';
import { ModuleAttributesDto } from './dtos/module.attributes.dto';
import { ModuleMenuAttributesDto } from './dtos/module.menu.attributes.dto';
import { NumberRangeFilterDto } from './dtos/number.range.filter.dto';
import { PreferenceUserGroupAttributesDto } from './dtos/preference.user.group.attributes.dto';
import { PreferenceUsersAttributesDto } from './dtos/preference.users.attributes.dto';
import { ProductAttributesDto } from './dtos/product.attributes.dto';
import { RoleGroupAttributesDto } from './dtos/role.group.attributes.dto';
import { StringSearchDto } from './dtos/string.search.dto';
import { UiActionAttributesDto } from './dtos/ui.action.attributes.dto';
import { UiActionRoleAttributesDto } from './dtos/ui.action.role.attributes.dto';
import { UserPreferenceAttributesDto } from './dtos/user.preference.attributes.dto';
import { UserRoleAttributesDto } from './dtos/user.role.attributes.dto';
import { AccessBusinessEntity } from './entities/access.business.entity';
import { BusinessGroupRoleEntity } from './entities/business.group.role.entity';
import { BusinessPreferenceEntity } from './entities/business.preference.entity';
import { BusinessUserEntity } from './entities/business.user.entity';
import { BusinessUserGroupEntity } from './entities/business.user.group.entity';
import { BusinessUserRoleEntity } from './entities/business.user.role.entity';
import { ChildMenuEntity } from './entities/child.menu.entity';
import { CustomReportEntity } from './entities/custom.report.entity';
import { DashboardComponentEntity } from './entities/dashboard.component.entity';
import { DashboardEntity } from './entities/dashboard.entity';
import { GroupMemberEntity } from './entities/group.member.entity';
import { GroupRoleEntity } from './entities/group.role.entity';
import { ListPreferenceEntity } from './entities/list.preference.entity';
import { ListingColumnEntity } from './entities/listing.column.entity';
import { ListingPageEntity } from './entities/listing.page.entity';
import { ListingPreferenceEntity } from './entities/listing.preference.entity';
import { MenuActionEntity } from './entities/menu.action.entity';
import { MenuEntity } from './entities/menu.entity';
import { MenuRoleEntity } from './entities/menu.role.entity';
import { ModuleEntity } from './entities/module.entity';
import { ModuleMenuEntity } from './entities/module.menu.entity';
import { PreferenceUserEntity } from './entities/preference.user.entity';
import { PreferenceUserGroupEntity } from './entities/preference.user.group.entity';
import { ProductEntity } from './entities/product.entity';
import { RoleGroupEntity } from './entities/role.group.entity';
import { UiActionEntity } from './entities/ui.action.entity';
import { UiActionRoleEntity } from './entities/ui.action.role.entity';
import { UserPreferenceEntity } from './entities/user.preference.entity';
import { UserRoleEntity } from './entities/user.role.entity';
import { BusinessGroupRoleJob } from './jobs/business.group.role.job';
import { BusinessPreferenceJob } from './jobs/business.preference.job';
import { BusinessUserGroupJob } from './jobs/business.user.group.job';
import { BusinessUserJob } from './jobs/business.user.job';
import { BusinessUserRoleJob } from './jobs/business.user.role.job';
import { ChildMenuJob } from './jobs/child.menu.job';
import { CustomReportJob } from './jobs/custom.report.job';
import { DashboardComponentJob } from './jobs/dashboard.component.job';
import { DashboardJob } from './jobs/dashboard.job';
import { GroupMemberJob } from './jobs/group.member.job';
import { GroupRoleJob } from './jobs/group.role.job';
import { ListPreferenceJob } from './jobs/list.preference.job';
import { ListingColumnJob } from './jobs/listing.column.job';
import { ListingPageJob } from './jobs/listing.page.job';
import { ListingPreferenceJob } from './jobs/listing.preference.job';
import { MenuActionJob } from './jobs/menu.action.job';
import { MenuJob } from './jobs/menu.job';
import { MenuRoleJob } from './jobs/menu.role.job';
import { ModuleJob } from './jobs/module.job';
import { ModuleMenuJob } from './jobs/module.menu.job';
import { PreferenceUserGroupJob } from './jobs/preference.user.group.job';
import { PreferenceUsersJob } from './jobs/preference.users.job';
import { ProductJob } from './jobs/product.job';
import { RoleGroupJob } from './jobs/role.group.job';
import { UiActionJob } from './jobs/ui.action.job';
import { UiActionRoleJob } from './jobs/ui.action.role.job';
import { UserPreferenceJob } from './jobs/user.preference.job';
import { UserRoleJob } from './jobs/user.role.job';
import { ProcessApplicationMenu } from './libraries/process.application.menu';
import { ProcessBusinessGroupRoleUpdation } from './libraries/process.business.group.role.updation';
import { ProcessBusinessUserRoleUpdate } from './libraries/process.business.user.role.update';
import { ProcessCommonList } from './libraries/process.common.list';
import { ProcessDashboardReport } from './libraries/process.dashboard.report';
import { ProcessDateFilter } from './libraries/process.date.filter';
import { ProcessGroupMemberUpdation } from './libraries/process.group.member.updation';
import { ProcessListingCsvFile } from './libraries/process.listing.csv.file';
import { ProcessMenuDetails } from './libraries/process.menu.details';
import { ProcessPreferenceData } from './libraries/process.preference.data';
import { ProcessReportData } from './libraries/process.report.data';
import { ProcessTestList } from './libraries/process.test.list';
import { BusinessMiddleware } from './middlewares/business.middleware';
import { AccessBusinessService } from './services/access.business.service';
import { BusinessPreferenceService } from './services/business.preference.service';
import { BusinessUserRoleService } from './services/business.user.role.service';
import { Es6JobsService } from './services/es6.jobs.service';
import { ListingPreferenceService } from './services/listing.preference.service';
import { ListingService } from './services/listing.service';
import { LoadEntityService } from './services/load.entity.service';
import { UserPreferenceService } from './services/user.preference.service';
import { BusinessGroupRoleSubscriber } from './subscribers/business.group.role.subscriber';
import { BusinessPreferenceSubscriber } from './subscribers/business.preference.subscriber';
import { BusinessUserGroupSubscriber } from './subscribers/business.user.group.subscriber';
import { BusinessUserRoleSubscriber } from './subscribers/business.user.role.subscriber';
import { BusinessUserSubscriber } from './subscribers/business.user.subscriber';
import { ChildMenuSubscriber } from './subscribers/child.menu.subscriber';
import { CustomReportSubscriber } from './subscribers/custom.report.subscriber';
import { DashboardComponentSubscriber } from './subscribers/dashboard.component.subscriber';
import { DashboardSubscriber } from './subscribers/dashboard.subscriber';
import { GroupMemberSubscriber } from './subscribers/group.member.subscriber';
import { GroupRoleSubscriber } from './subscribers/group.role.subscriber';
import { ListPreferenceSubscriber } from './subscribers/list.preference.subscriber';
import { ListingColumnSubscriber } from './subscribers/listing.column.subscriber';
import { ListingPageSubscriber } from './subscribers/listing.page.subscriber';
import { ListingPreferenceSubscriber } from './subscribers/listing.preference.subscriber';
import { MenuActionSubscriber } from './subscribers/menu.action.subscriber';
import { MenuRoleSubscriber } from './subscribers/menu.role.subscriber';
import { MenuSubscriber } from './subscribers/menu.subscriber';
import { ModuleMenuSubscriber } from './subscribers/module.menu.subscriber';
import { ModuleSubscriber } from './subscribers/module.subscriber';
import { PreferenceUserGroupSubscriber } from './subscribers/preference.user.group.subscriber';
import { PreferenceUserSubscriber } from './subscribers/preference.user.subscriber';
import { ProductSubscriber } from './subscribers/product.subscriber';
import { RoleGroupSubscriber } from './subscribers/role.group.subscriber';
import { UiActionRoleSubscriber } from './subscribers/ui.action.role.subscriber';
import { UiActionSubscriber } from './subscribers/ui.action.subscriber';
import { UserPreferenceSubscriber } from './subscribers/user.preference.subscriber';
import { UserRoleSubscriber } from './subscribers/user.role.subscriber';

const es6Classes = {
    controllers: [
        AccessMenuController,
        BusinessPreferenceController,
        DashboardController,
        ListingController,
        ListingPreferenceController,
        UserPreferenceController,
    ],
    dtos: [
        AccessBusinessParamDto,
        AddBusinessPreferenceDto,
        AddListingPreferenceDto,
        AddUserPreferenceDto,
        BusinessPreferenceAttributesDto,
        BusinessUserAttributesDto,
        BusinessUserGroupAttributesDto,
        BusinessUserRoleAttributesDto,
        ChildMenuAttributesDto,
        CommonListFilterDto,
        CustomReportAttributesDto,
        DashboardAttributesDto,
        DashboardComponentAttributesDto,
        DateFilterDto,
        DateRangeFilterDto,
        GroupMemberAttributesDto,
        GroupRoleAttributesDto,
        ListPreferenceAttributesDto,
        ListResponseDto,
        ListResponseFormatDto,
        ListingColumnAttributesDto,
        ListingPageAttributesDto,
        ListingPreferenceAttributesDto,
        MenuActionAttributesDto,
        MenuAttributesDto,
        MenuRoleAttributesDto,
        ModuleAttributesDto,
        ModuleMenuAttributesDto,
        NumberRangeFilterDto,
        PreferenceUserGroupAttributesDto,
        PreferenceUsersAttributesDto,
        ProductAttributesDto,
        RoleGroupAttributesDto,
        StringSearchDto,
        UiActionAttributesDto,
        UiActionRoleAttributesDto,
        UserPreferenceAttributesDto,
        UserRoleAttributesDto,
    ],
    entities: [
        AccessBusinessEntity,
        BusinessGroupRoleEntity,
        BusinessPreferenceEntity,
        BusinessUserEntity,
        BusinessUserGroupEntity,
        BusinessUserRoleEntity,
        ChildMenuEntity,
        CustomReportEntity,
        DashboardComponentEntity,
        DashboardEntity,
        GroupMemberEntity,
        GroupRoleEntity,
        ListPreferenceEntity,
        ListingColumnEntity,
        ListingPageEntity,
        ListingPreferenceEntity,
        MenuActionEntity,
        MenuEntity,
        MenuRoleEntity,
        ModuleEntity,
        ModuleMenuEntity,
        PreferenceUserEntity,
        PreferenceUserGroupEntity,
        ProductEntity,
        RoleGroupEntity,
        UiActionEntity,
        UiActionRoleEntity,
        UserPreferenceEntity,
        UserRoleEntity,
    ],
    jobs: [
        BusinessGroupRoleJob,
        BusinessPreferenceJob,
        BusinessUserGroupJob,
        BusinessUserJob,
        BusinessUserRoleJob,
        ChildMenuJob,
        CustomReportJob,
        DashboardComponentJob,
        DashboardJob,
        GroupMemberJob,
        GroupRoleJob,
        ListPreferenceJob,
        ListingColumnJob,
        ListingPageJob,
        ListingPreferenceJob,
        MenuActionJob,
        MenuJob,
        MenuRoleJob,
        ModuleJob,
        ModuleMenuJob,
        PreferenceUserGroupJob,
        PreferenceUsersJob,
        ProductJob,
        RoleGroupJob,
        UiActionJob,
        UiActionRoleJob,
        UserPreferenceJob,
        UserRoleJob,
    ],
    libraries: [
        ProcessApplicationMenu,
        ProcessBusinessGroupRoleUpdation,
        ProcessBusinessUserRoleUpdate,
        ProcessCommonList,
        ProcessDashboardReport,
        ProcessDateFilter,
        ProcessGroupMemberUpdation,
        ProcessListingCsvFile,
        ProcessMenuDetails,
        ProcessPreferenceData,
        ProcessReportData,
        ProcessTestList,
    ],
    middlewares: [BusinessMiddleware],
    services: [
        AccessBusinessService,
        BusinessPreferenceService,
        BusinessUserRoleService,
        Es6JobsService,
        ListingPreferenceService,
        ListingService,
        LoadEntityService,
        UserPreferenceService,
    ],
    subscribers: [
        BusinessGroupRoleSubscriber,
        BusinessPreferenceSubscriber,
        BusinessUserGroupSubscriber,
        BusinessUserRoleSubscriber,
        BusinessUserSubscriber,
        ChildMenuSubscriber,
        CustomReportSubscriber,
        DashboardComponentSubscriber,
        DashboardSubscriber,
        GroupMemberSubscriber,
        GroupRoleSubscriber,
        ListPreferenceSubscriber,
        ListingColumnSubscriber,
        ListingPageSubscriber,
        ListingPreferenceSubscriber,
        MenuActionSubscriber,
        MenuRoleSubscriber,
        MenuSubscriber,
        ModuleMenuSubscriber,
        ModuleSubscriber,
        PreferenceUserGroupSubscriber,
        PreferenceUserSubscriber,
        ProductSubscriber,
        RoleGroupSubscriber,
        UiActionRoleSubscriber,
        UiActionSubscriber,
        UserPreferenceSubscriber,
        UserRoleSubscriber,
    ],
};

export default es6Classes;
