import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as httpContext from 'express-http-context';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import 'source-map-support/register';
import { AppModule } from './app.module';
import * as corsConfig from './config/cors.config';
import rateLimiterConfig = require('./config/rate.limiter.config');

// tslint:disable-next-line: no-var-requires
require('source-map-support').install();

// set stack trace limit to higher number
Error.stackTraceLimit = 100;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(httpContext.middleware);

    app.enableCors(corsConfig);
    app.use(rateLimit(rateLimiterConfig));
    app.use(compression());

    // tslint:disable-next-line: no-unused-expression

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    // starting the server on the defined port
    await app.listen(process.env.SERVER_PORT || 4000);
}
bootstrap();
