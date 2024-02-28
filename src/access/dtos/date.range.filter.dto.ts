import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DateRangeFilterDto {
    @IsNotEmpty()
    @Expose()
    min: Date;

    @IsNotEmpty()
    @Expose()
    max: Date;
}
