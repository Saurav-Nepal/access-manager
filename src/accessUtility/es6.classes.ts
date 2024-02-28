import { BulkDefinitionAttributesDto } from './dtos/bulk.definition.attributes.dto';
import { BulkDefinitionLoadAttributesDto } from './dtos/bulk.definition.load.attributes.dto';
import { BulkDefinitionProcessingAttributesDto } from './dtos/bulk.definition.processing.attributes.dto';
import { BulkUploadAttributesDto } from './dtos/bulk.upload.attributes.dto';
import { BulkUploadColumnAttributesDto } from './dtos/bulk.upload.column.attributes.dto';
import { BulkUploadItemAttributesDto } from './dtos/bulk.upload.item.attributes.dto';
import { BulkUploadSheetDto } from './dtos/bulk.upload.sheet.dto';
import { BulkUploadTypeAttributesDto } from './dtos/bulk.upload.type.attributes.dto';
import { DataMappingAttributesDto } from './dtos/data.mapping.attributes.dto';
import { ErrorHandlingDto } from './dtos/error.handling.dto';
import { ListingModelAttributesDto } from './dtos/listing.model.attributes.dto';
import { TagAssignmentAttributesDto } from './dtos/tag.assignment.attributes.dto';
import { BulkDefinitionEntity } from './entities/bulk.definition.entity';
import { BulkDefinitionLoadEntity } from './entities/bulk.definition.load.entity';
import { BulkDefinitionProcessingEntity } from './entities/bulk.definition.processing.entity';
import { BulkUploadColumnEntity } from './entities/bulk.upload.column.entity';
import { BulkUploadEntity } from './entities/bulk.upload.entity';
import { BulkUploadItemEntity } from './entities/bulk.upload.item.entity';
import { BulkUploadTypeEntity } from './entities/bulk.upload.type.entity';
import { DataMappingEntity } from './entities/data.mapping.entity';
import { ListingModelEntity } from './entities/listing.model.entity';
import { TagAssignmentEntity } from './entities/tag.assignment.entity';
import { BulkDefinitionJob } from './jobs/bulk.definition.job';
import { BulkDefinitionLoadJob } from './jobs/bulk.definition.load.job';
import { BulkDefinitionProcessingJob } from './jobs/bulk.definition.processing.job';
import { BulkUploadColumnJob } from './jobs/bulk.upload.column.job';
import { BulkUploadItemJob } from './jobs/bulk.upload.item.job';
import { BulkUploadJob } from './jobs/bulk.upload.job';
import { BulkUploadTypeJob } from './jobs/bulk.upload.type.job';
import { DataMappingJob } from './jobs/data.mapping.job';
import { ListingModelJob } from './jobs/listing.model.job';
import { TagAssignmentJob } from './jobs/tag.assignment.job';
import { ProcessCommonData } from './libraries/process.common.data';
import { Es6JobsService } from './services/es6.jobs.service';
import { TestAccessService } from './services/test.access.service';
import { BulkDefinitionLoadSubscriber } from './subscribers/bulk.definition.load.subscriber';
import { BulkDefinitionProcessingSubscriber } from './subscribers/bulk.definition.processing.subscriber';
import { BulkDefinitionSubscriber } from './subscribers/bulk.definition.subscriber';
import { BulkUploadColumnSubscriber } from './subscribers/bulk.upload.column.subscriber';
import { BulkUploadItemSubscriber } from './subscribers/bulk.upload.item.subscriber';
import { BulkUploadSubscriber } from './subscribers/bulk.upload.subscriber';
import { BulkUploadTypeSubscriber } from './subscribers/bulk.upload.type.subscriber';
import { DataMappingSubscriber } from './subscribers/data.mapping.subscriber';
import { ListingModelSubscriber } from './subscribers/listing.model.subscriber';
import { TagAssignmentSubscriber } from './subscribers/tag.assignment.subscriber';

const es6Classes = {
    controllers: [],
    dtos: [
        BulkDefinitionAttributesDto,
        BulkDefinitionLoadAttributesDto,
        BulkDefinitionProcessingAttributesDto,
        BulkUploadAttributesDto,
        BulkUploadColumnAttributesDto,
        BulkUploadItemAttributesDto,
        BulkUploadSheetDto,
        BulkUploadTypeAttributesDto,
        DataMappingAttributesDto,
        ErrorHandlingDto,
        ListingModelAttributesDto,
        TagAssignmentAttributesDto,
    ],
    entities: [
        BulkDefinitionEntity,
        BulkDefinitionLoadEntity,
        BulkDefinitionProcessingEntity,
        BulkUploadColumnEntity,
        BulkUploadEntity,
        BulkUploadItemEntity,
        BulkUploadTypeEntity,
        DataMappingEntity,
        ListingModelEntity,
        TagAssignmentEntity,
    ],
    jobs: [
        BulkDefinitionJob,
        BulkDefinitionLoadJob,
        BulkDefinitionProcessingJob,
        BulkUploadColumnJob,
        BulkUploadItemJob,
        BulkUploadJob,
        BulkUploadTypeJob,
        DataMappingJob,
        ListingModelJob,
        TagAssignmentJob,
    ],
    libraries: [ProcessCommonData],
    services: [Es6JobsService, TestAccessService],
    subscribers: [
        BulkDefinitionLoadSubscriber,
        BulkDefinitionProcessingSubscriber,
        BulkDefinitionSubscriber,
        BulkUploadColumnSubscriber,
        BulkUploadItemSubscriber,
        BulkUploadSubscriber,
        BulkUploadTypeSubscriber,
        DataMappingSubscriber,
        ListingModelSubscriber,
        TagAssignmentSubscriber,
    ],
};

export default es6Classes;
