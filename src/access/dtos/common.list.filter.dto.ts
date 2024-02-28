import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Min, MinLength, ValidateNested } from 'class-validator';
import { DateFilterDto } from './date.filter.dto';
import { ListResponseFormatDto } from './list.response.format.dto';
import { NumberRangeFilterDto } from './number.range.filter.dto';

export class CommonListFilterDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @Expose()
    search?: string;

    @IsOptional()
    @IsNumber()
    @Expose()
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Expose()
    page?: number;

    @IsOptional()
    @IsBoolean()
    @Expose()
    stats?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    no_metrics?: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => ListResponseFormatDto)
    format?: ListResponseFormatDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => DateFilterDto)
    @Expose()
    date?: DateFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => NumberRangeFilterDto)
    @Expose()
    amount?: NumberRangeFilterDto;

    @IsOptional()
    @Expose()
    aggregate?: Record<string, string>;

    @IsOptional()
    @Expose()
    filter_query?: string;

    @IsOptional()
    @Expose()
    listing_slug?: string;

    @IsOptional()
    @Expose()
    injected_query?: string;
}
