import { Controller, Get, Param } from '@nestjs/common';
import { Auth, QueueService, RefreshPropertyCacheJob, SqlService, UploadService } from '@servicelabsco/nestjs-utility-services';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly queueService: QueueService,
        private readonly sqlService: SqlService,
        private readonly uploadService: UploadService,
        private readonly refreshPropertyCacheJob: RefreshPropertyCacheJob
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('internal/test')
    check() {
        return 'am here';
    }

    @Get('api/auth')
    async auth() {
        return Auth.user();
    }

    @Get('failed-jobs')
    async getFailedJobs() {
        return this.queueService.getFailedJobs(0, 100);
    }

    @Get('refresh-cache')
    async refreshCache() {
        await this.refreshPropertyCacheJob.delayedDispatch(1);
    }

    @Get('clean-jobs')
    async cleanQueue() {
        const queue = this.queueService.getQueueInstance();

        queue.clean(0, 'delayed');
        queue.clean(0, 'wait');
        queue.clean(0, 'active');
        queue.clean(0, 'completed');
        queue.clean(0, 'failed');
    }

    @Get('queue/:id')
    async getQueueDetails(@Param('id') id: number) {
        return this.queueService.getJobDetails(id);
    }

    @Get('queue')
    async getQueue() {
        const runningStats = await this.queueService.getStats();
        const jobStats = await this.queueService.getQueueStats();

        return { runningStats, jobStats };
    }

    @Get('set')
    async set() {}
}
