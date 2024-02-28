import { Injectable } from '@nestjs/common';
import { BusinessGroupRoleJob } from '../jobs/business.group.role.job';
import { BusinessPreferenceJob } from '../jobs/business.preference.job';
import { BusinessUserGroupJob } from '../jobs/business.user.group.job';
import { BusinessUserJob } from '../jobs/business.user.job';
import { BusinessUserRoleJob } from '../jobs/business.user.role.job';
import { ChildMenuJob } from '../jobs/child.menu.job';
import { CustomReportJob } from '../jobs/custom.report.job';
import { DashboardComponentJob } from '../jobs/dashboard.component.job';
import { DashboardJob } from '../jobs/dashboard.job';
import { GroupMemberJob } from '../jobs/group.member.job';
import { GroupRoleJob } from '../jobs/group.role.job';
import { ListPreferenceJob } from '../jobs/list.preference.job';
import { ListingColumnJob } from '../jobs/listing.column.job';
import { ListingPageJob } from '../jobs/listing.page.job';
import { ListingPreferenceJob } from '../jobs/listing.preference.job';
import { MenuActionJob } from '../jobs/menu.action.job';
import { MenuJob } from '../jobs/menu.job';
import { MenuRoleJob } from '../jobs/menu.role.job';
import { ModuleJob } from '../jobs/module.job';
import { ModuleMenuJob } from '../jobs/module.menu.job';
import { PreferenceUserGroupJob } from '../jobs/preference.user.group.job';
import { PreferenceUsersJob } from '../jobs/preference.users.job';
import { ProductJob } from '../jobs/product.job';
import { RoleGroupJob } from '../jobs/role.group.job';
import { UiActionJob } from '../jobs/ui.action.job';
import { UiActionRoleJob } from '../jobs/ui.action.role.job';
import { UserPreferenceJob } from '../jobs/user.preference.job';
import { UserRoleJob } from '../jobs/user.role.job';
import { PlatformUtility } from '@servicelabsco/nestjs-utility-services';

/**
 * this would get all the jobs which is part of the given module
 * @export
 * @class Es6JobsService
 */
@Injectable()
export class Es6JobsService {
    private jobs = {};

    constructor(
        private readonly businessGroupRoleJob: BusinessGroupRoleJob,
        private readonly businessPreferenceJob: BusinessPreferenceJob,
        private readonly businessUserGroupJob: BusinessUserGroupJob,
        private readonly businessUserJob: BusinessUserJob,
        private readonly businessUserRoleJob: BusinessUserRoleJob,
        private readonly childMenuJob: ChildMenuJob,
        private readonly customReportJob: CustomReportJob,
        private readonly dashboardComponentJob: DashboardComponentJob,
        private readonly dashboardJob: DashboardJob,
        private readonly groupMemberJob: GroupMemberJob,
        private readonly groupRoleJob: GroupRoleJob,
        private readonly listPreferenceJob: ListPreferenceJob,
        private readonly listingColumnJob: ListingColumnJob,
        private readonly listingPageJob: ListingPageJob,
        private readonly listingPreferenceJob: ListingPreferenceJob,
        private readonly menuActionJob: MenuActionJob,
        private readonly menuJob: MenuJob,
        private readonly menuRoleJob: MenuRoleJob,
        private readonly moduleJob: ModuleJob,
        private readonly moduleMenuJob: ModuleMenuJob,
        private readonly preferenceUserGroupJob: PreferenceUserGroupJob,
        private readonly preferenceUsersJob: PreferenceUsersJob,
        private readonly productJob: ProductJob,
        private readonly roleGroupJob: RoleGroupJob,
        private readonly uiActionJob: UiActionJob,
        private readonly uiActionRoleJob: UiActionRoleJob,
        private readonly userPreferenceJob: UserPreferenceJob,
        private readonly userRoleJob: UserRoleJob
    ) {
        this.alignJobs();
        this.setJobs();
    }

    /**
     * this would assign all the jobs which is defined
     * @memberof Es6JobsService
     */
    alignJobs() {
        this.jobs = {
            f456a6f7d1791af00f58d78bbaab144b: this.businessGroupRoleJob,
            b31ffc403925101fb511c12e81892e68: this.businessPreferenceJob,
            '8d9bc56e4c29169dde8f2de343ce44b9': this.businessUserGroupJob,
            '1df027a19ec3d416b60ffd7024e39e5c': this.businessUserJob,
            '4a7a00b3a8090e793aeabb9277e2d725': this.businessUserRoleJob,
            '589559e61985b6f208ec30499776da52': this.childMenuJob,
            '8b3d598688b3d4111694c0e07c6294b7': this.customReportJob,
            e3b7f33d4173dbbdf182ba26d62526cd: this.dashboardComponentJob,
            '602b37b1d7d36da5bf800ed3fdb23fe5': this.dashboardJob,
            '19909d0969494ac331b1e53a8a80445d': this.groupMemberJob,
            '3cc58c9673f618e58e3080f8ab64118d': this.groupRoleJob,
            '13cb7ad5630f26a75b84e33afc467b4a': this.listPreferenceJob,
            '378591108560f65a7880f5bf5d1594b8': this.listingColumnJob,
            b71428a675fb7ea36eb9fcb108af209a: this.listingPageJob,
            '7c6db82c4cae6129f613fb012e06fe6a': this.listingPreferenceJob,
            '9946abff6e87a8549492a9481fe12fb2': this.menuActionJob,
            f13222badfad6a49064a0c9f22c98299: this.menuJob,
            c7109751849caa0e0c506ca9567b5095: this.menuRoleJob,
            '3e04a5e072f260549c3acc6efff7c1f9': this.moduleJob,
            '447c2a2defb0e76e97cd8a83503e0df2': this.moduleMenuJob,
            ae659d7c00a87bd306d449800b77f9fb: this.preferenceUserGroupJob,
            '5e4290185523173053f4c2bd2d6f781a': this.preferenceUsersJob,
            '380f3258c132c9a6bdcda56024f25fcc': this.productJob,
            cc942b35323b7ed6158469df81dee73a: this.roleGroupJob,
            '7e7d83369da7953ef5749c629446db5e': this.uiActionJob,
            '0c812ceb276252bca70289acf23b2197': this.uiActionRoleJob,
            cde37d522acab091e506685644fa3a97: this.userPreferenceJob,
            '98f60308658ff30626fe84c0b0b55165': this.userRoleJob,
        };
    }

    /**
     * assign the jobs service to the local property
     * @memberof Es6JobsService
     */
    setJobs() {
        PlatformUtility.setJobs(this.jobs);
    }
}
