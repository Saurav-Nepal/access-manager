export class ListResponseDto {
    stats?: { total?: number; page?: number; limit?: number };
    metrics?: { [key: string]: number | {} };
    records?: any[];
    file?: string;
    headers?: any;
    aggregate?: number;
    url?: string;
}
