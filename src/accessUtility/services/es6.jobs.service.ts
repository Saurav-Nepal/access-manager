import { Injectable } from '@nestjs/common';
import { BulkDefinitionJob } from '../jobs/bulk.definition.job';
import { BulkDefinitionLoadJob } from '../jobs/bulk.definition.load.job';
import { BulkDefinitionProcessingJob } from '../jobs/bulk.definition.processing.job';
import { BulkUploadColumnJob } from '../jobs/bulk.upload.column.job';
import { BulkUploadItemJob } from '../jobs/bulk.upload.item.job';
import { BulkUploadJob } from '../jobs/bulk.upload.job';
import { BulkUploadTypeJob } from '../jobs/bulk.upload.type.job';
import { DataMappingJob } from '../jobs/data.mapping.job';
import { ListingModelJob } from '../jobs/listing.model.job';
import { TagAssignmentJob } from '../jobs/tag.assignment.job';
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
        private readonly bulkDefinitionJob: BulkDefinitionJob,
        private readonly bulkDefinitionLoadJob: BulkDefinitionLoadJob,
        private readonly bulkDefinitionProcessingJob: BulkDefinitionProcessingJob,
        private readonly bulkUploadColumnJob: BulkUploadColumnJob,
        private readonly bulkUploadItemJob: BulkUploadItemJob,
        private readonly bulkUploadJob: BulkUploadJob,
        private readonly bulkUploadTypeJob: BulkUploadTypeJob,
        private readonly dataMappingJob: DataMappingJob,
        private readonly listingModelJob: ListingModelJob,
        private readonly tagAssignmentJob: TagAssignmentJob
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
            '7ab31de7bb789023df411ea5b9033a16': this.bulkDefinitionJob,
            '8ce26039566d9037a5281a602f2498b0': this.bulkDefinitionLoadJob,
            a9ee15e9a3abc5411671a79233e5f4ed: this.bulkDefinitionProcessingJob,
            b7f89dc40006565730879d2c2ff84eaa: this.bulkUploadColumnJob,
            abe18c2c192a1958f8bcb97de4af8ab8: this.bulkUploadItemJob,
            '42c644ec2f0a2c9bbe7dcb133575af17': this.bulkUploadJob,
            b18f0d1dd2bec92c1fbc6a07a9ac6d33: this.bulkUploadTypeJob,
            '518c9259f8a996051ef1a8dcdd5b5498': this.dataMappingJob,
            '02b3275741183ecabec395645cef8415': this.listingModelJob,
            '83d1f1a159cc83a0f7530050be74a2dc': this.tagAssignmentJob,
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
