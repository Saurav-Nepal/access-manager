import { IsBoolean, IsOptional } from 'class-validator';
export class ListResponseFormatDto {
    @IsOptional()
    @IsBoolean()
    json?: boolean;

    @IsOptional()
    @IsBoolean()
    csv?: boolean;
}
