import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class StringSearchDto {
    @Expose()
    @IsOptional()
    str: string;

    @Expose()
    @IsOptional()
    limit?: number;
}
