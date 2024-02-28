import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    AuthModule,
    BasicAuthMiddleware,
    InternalMiddleware,
    JwtMiddleware,
    PlatformUtilityModule,
    RestrictedMiddleware,
    SystemModule,
} from '@servicelabsco/nestjs-utility-services';
import { AccessModule } from './access/access.module';
import { AccessUtilityModule } from './accessUtility/access.utility.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as queueConfig from './config/queue.config';
import * as readOrmconfig from './config/read.typeorm.config';
import * as ormconfig from './config/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        TypeOrmModule.forRoot(readOrmconfig),
        BullModule.forRoot(queueConfig),
        AuthModule,
        SystemModule,
        PlatformUtilityModule,
        AccessModule,
        ConfigModule.forRoot({ isGlobal: true }),
        AccessUtilityModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
        consumer.apply(BasicAuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
        consumer.apply(RestrictedMiddleware).forRoutes({ path: 'api/*', method: RequestMethod.ALL });
        consumer.apply(InternalMiddleware).forRoutes({ path: 'internal/*', method: RequestMethod.ALL });
    }
}
