import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { BulkUploadEntity } from '../entities/bulk.upload.entity';
@Injectable()
export class BulkUploadJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('42c644ec2f0a2c9bbe7dcb133575af17');
    }
    async handle(evt: DatabaseEventDto<BulkUploadEntity>) {
        await this.setAnalysed(evt);
        await this.setProcessed(evt);
    }

    private async setAnalysed(evt: DatabaseEventDto<BulkUploadEntity>) {
        if (!this.isColumnUpdated(evt, ['analysed_rows'])) return;
        if (!evt.entity.analysed_rows) return;

        if (evt.entity.total_rows !== evt.entity.analysed_rows) return;
        if (evt.entity.analysed_at) return;

        const entity = await BulkUploadEntity.first(evt.entity.id);
        if (entity.analysed_at) return;

        entity.analysed_at = new Date();

        return entity.save();
    }

    private async setProcessed(evt: DatabaseEventDto<BulkUploadEntity>) {
        if (!this.isColumnUpdated(evt, ['processed_rows'])) return;
        if (!evt.entity.processed_rows) return;

        if (evt.entity.total_rows !== evt.entity.processed_rows) return;
        if (evt.entity.processed_at) return;

        const entity = await BulkUploadEntity.first(evt.entity.id);
        if (entity.processed_at) return;

        entity.processed_at = new Date();

        return entity.save();
    }
}
