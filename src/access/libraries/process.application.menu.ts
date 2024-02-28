import { AccessService, CacheService, ClassMapper } from '@servicelabsco/nestjs-utility-services';
import { addMinutes } from 'date-fns';
import { ChildMenuEntity } from '../entities/child.menu.entity';
import { MenuEntity } from '../entities/menu.entity';
import { MenuRoleEntity } from '../entities/menu.role.entity';
import { ModuleEntity } from '../entities/module.entity';
import { ModuleMenuEntity } from '../entities/module.menu.entity';

export class ProcessApplicationMenu {
    private cacheKey: string;

    private menuIds: number[] = [];

    constructor(
        private readonly cacheService: CacheService,
        private readonly accessService: AccessService
    ) {}

    /**
     * get all the menus which the user has access to
     * @return {*}
     * @memberof MenuService
     */
    async process(id: number) {
        const menus = await this.getDataFromDB(id);
        await this.cacheService.set(this.cacheKey, menus, addMinutes(new Date(), 5));

        return menus;
    }

    private async getDataFromDB(id: number) {
        const modules = await this.loadModules(id);
        const data = [];

        modules.forEach((module) => {
            if (!Array.isArray(module)) data.push(module);
        });
        return {
            modules: data,
        };
    }

    /**
     * get all the modules and the corresponding menus
     * @private
     * @return {*}
     * @memberof MenuService
     */
    private async loadModules(id: number) {
        const modules = await ModuleEntity.find({
            where: { active: true, product_id: id },
            order: { display_order: 'ASC' },
            relations: ['ui_action'],
        });

        const data = [];

        for (const module of modules) {
            const m = await this.getModuleMenus(module);
            data.push(m);
        }

        return data;
    }

    /**
     * get all menus defined with the module and the user has access to
     * @private
     * @param {ModuleEntity} module
     * @return {*}
     * @memberof MenuService
     */
    private async getModuleMenus(module: ModuleEntity) {
        const moduleMenus = await ModuleMenuEntity.find({
            where: { module_id: module.id },
            order: { display_order: 'ASC' },
            relations: ['menu', 'menu.ui_action'],
        });

        const data: any = { ...ClassMapper.removeWhoColumns(module) };

        if (moduleMenus.length === 0) return data;

        data.menus = [];

        for (const moduleMenu of moduleMenus) {
            // if menu exists and the menu is not soft deleted
            if (!moduleMenu.menu) continue;

            // check if menu is allowed for the user
            const isMenuAllowed = await this.isMenuAllowed(moduleMenu.menu);
            if (!isMenuAllowed) continue;

            // merge the menu to the main data
            const menu = ClassMapper.removeWhoColumns({ ...moduleMenu.menu, display_order: moduleMenu.display_order });

            data.menus.push(menu);

            // check for all child menus
            const childMenus = await ChildMenuEntity.find({ where: { parent_id: menu.id }, relations: ['menu'] });

            childMenus.forEach((childMenu) => {
                if (this.menuIds.indexOf(childMenu.menu_id) === -1) data.menus.push(ClassMapper.removeWhoColumns(childMenu.menu));
            });
        }

        return data;
    }

    /**
     * check if user has access to the given menu
     * @private
     * @param {MenuRoleEntity[]} roles
     * @return {*}
     * @memberof MenuService
     */
    private async isMenuAllowed(menu: MenuEntity) {
        const roles = await MenuRoleEntity.find({ where: { menu_id: menu.id } });
        if (!roles.length) return true;

        return this.accessService.hasRoleAssignments(roles);
    }
}
