import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class BasePaginationDto {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    limit?: number;

    // @ApiProperty({ required: false, default: 'desc' })
    // @IsOptional()
    // sortOrder?: string;

    // @ApiProperty({ required: false })
    // @IsOptional()
    // searchByStatus?: string;

    // @ApiProperty({ required: false })
    // @IsOptional()
    // sortBy?: string;

    // @ApiProperty({ required: false })
    // @IsOptional()
    // searchVal?: string;
}
export class CommonPaginationDto {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    limit?: number;
}