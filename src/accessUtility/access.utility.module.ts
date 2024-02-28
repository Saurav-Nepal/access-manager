import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, PlatformUtilityModule, SystemModule } from '@servicelabsco/nestjs-utility-services';
import es6Classes from './es6.classes';

@Module({
    imports: [TypeOrmModule.forFeature(es6Classes.entities), PlatformUtilityModule, AuthModule, SystemModule],
    providers: [...es6Classes.services, ...es6Classes.jobs, ...es6Classes.subscribers],
    exports: [...es6Classes.services, ...es6Classes.jobs],
})
export class AccessUtilityModule {}
