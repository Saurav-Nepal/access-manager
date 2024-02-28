import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddListingPreferenceDto {
    @Expose()
    @IsOptional()
    id: number;

    @Expose()
    @IsOptional()
    identifier?: string;

    @Expose()
    @IsNotEmpty()
    column_definition: any;

    @Expose()
    @IsOptional()
    query_definition: any;

    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    is_global?: boolean;

    @Expose()
    @IsOptional()
    is_favourite?: boolean;

    @Expose()
    @IsOptional()
    @IsNumber({}, { each: true })
    user_ids?: number[];

    @Expose()
    @IsOptional()
    @IsNumber({}, { each: true })
    group_ids?: number[];
}
