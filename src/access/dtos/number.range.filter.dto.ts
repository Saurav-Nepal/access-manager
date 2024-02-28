import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class NumberRangeFilterDto {
    @IsNumber()
    @IsOptional()
    @Expose()
    min?: number;

    @IsOptional()
    @IsNumber()
    @Expose()
    max?: number;

    @IsBoolean()
    @IsOptional()
    positive?: boolean;

    @IsBoolean()
    @IsOptional()
    negative?: boolean;

    @IsBoolean()
    @IsOptional()
    zero?: boolean;
}
