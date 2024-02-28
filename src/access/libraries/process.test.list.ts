import { SqlService, UploadService } from '@servicelabsco/nestjs-utility-services';
import { CommonListFilterDto } from '../dtos/common.list.filter.dto';
import { ProcessCommonList } from './process.common.list';

export class ProcessTestList extends ProcessCommonList {
    protected filter: CommonListFilterDto;

    protected config = {
        sql: `bz_business_accounts a left join act_billing_accounts b on a.billing_id = b.id where a.deleted_at is null`,
        order: 'sq.business_name asc',
        columns: ['a.*', 'b.name business_name', 'b.gstin business_gstin', 'b.email', 'b.mobile', 'a.active'],
        metrics: [],
    };

    constructor(
        protected readonly sqlService: SqlService,
        protected readonly uploadService: UploadService
    ) {
        super();
    }

    async process(filter: CommonListFilterDto) {
        this.filter = filter;
        this.restrictions.push(`a.business_id = 1546`);

        return this.handle();
    }
}
