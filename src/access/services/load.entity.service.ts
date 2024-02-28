import { Injectable } from '@nestjs/common';
import { PlatformUtility } from '@servicelabsco/nestjs-utility-services';
import entityConstants = require('../../config/entity.constants');

@Injectable()
export class LoadEntityService {
    constructor() {
        this.setEntities();
    }

    /**
     * set the constants for entities
     * @memberof AppService
     */
    setEntities() {
        PlatformUtility.setEntities(entityConstants);
        global.console.log('setting up @servicelabsco/slabs-access-manager entities : ', Object.keys(entityConstants).length);
    }
}
