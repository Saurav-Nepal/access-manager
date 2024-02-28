import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Length } from 'class-validator';

export class AccessBusinessParamDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    second_id?: number;

    @IsOptional()
    @Expose()
    @Length(3, 100)
    slug?: string;
}
