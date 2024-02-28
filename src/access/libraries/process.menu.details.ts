import { AccessException, AccessService } from '@servicelabsco/nestjs-utility-services';
import { ChildMenuEntity } from '../entities/child.menu.entity';
import { MenuActionEntity } from '../entities/menu.action.entity';
import { MenuEntity } from '../entities/menu.entity';
import { MenuRoleEntity } from '../entities/menu.role.entity';
import { UiActionEntity } from '../entities/ui.action.entity';
import { UiActionRoleEntity } from '../entities/ui.action.role.entity';

export class ProcessMenuDetails {
    constructor(private readonly accessService: AccessService) {}

    async process(menuId: number): Promise<MenuEntity> {
        const menu = await MenuEntity.first(menuId);
        if (!menu) throw new AccessException();

        const hasAccess = await this.hasAccess(menu);
        if (!hasAccess) throw new AccessException();

        const uiActions: UiActionEntity[] = await this.getUiActions(menu);

        menu.ui_actions = uiActions.filter((item) => {
            return item?.id;
        });

        return menu;
    }

    private async hasAccess(menu: MenuEntity) {
        const hasDirectAccess = await this.userHasAccess(menu);

        if (hasDirectAccess) return true;

        return this.hasChildMenuAccess(menu);
    }

    private async hasChildMenuAccess(menu: MenuEntity) {
        const parents = await ChildMenuEntity.find({ where: { menu_id: menu.id }, relations: ['parent'] });

        for (const parent of parents) {
            const hasAccess = await this.userHasAccess(parent.parent);
            if (hasAccess) return true;
        }

        return false;
    }

    private async userHasAccess(menu: MenuEntity) {
        const roles = await MenuRoleEntity.find({ where: { menu_id: menu.id } });
        if (!roles.length) return true;

        return this.accessService.hasRoleAssignments(roles);
    }

    private async getUiActions(menu: MenuEntity) {
        const uiActions = await MenuActionEntity.find({ where: { menu_id: menu.id }, relations: ['ui_action'] });

        const promises = [];

        for (const action of uiActions) {
            promises.push(this.uiActionHasRole(action.ui_action));
        }

        return Promise.all(promises).then((res) => {
            return res;
        });
    }

    private async uiActionHasRole(uiAction: UiActionEntity) {
        if (!uiAction?.id) return false;

        const roles = await UiActionRoleEntity.find({ where: { ui_action_id: uiAction.id } });

        if (!roles.length) return uiAction;

        const hasAccess = this.accessService.hasRoleAssignments(roles);
        if (hasAccess) return uiAction;
    }
}
