import { Transform } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
   
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? Number(value) : 0))
    page: number = 1;
  
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? Number(value) : 10))
    @Max(1000)
    @Min(1)
    limit: number = 10;
  }
  