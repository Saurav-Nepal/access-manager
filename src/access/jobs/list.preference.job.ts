import { Injectable } from '@nestjs/common';
import { CommonJob, DatabaseEventDto, QueueService } from '@servicelabsco/nestjs-utility-services';
import { ListPreferenceEntity } from '../entities/list.preference.entity';
@Injectable()
export class ListPreferenceJob extends CommonJob {
    constructor(protected readonly queueService: QueueService) {
        super('13cb7ad5630f26a75b84e33afc467b4a');
    }
    async handle(evt: DatabaseEventDto<ListPreferenceEntity>) {}
}
