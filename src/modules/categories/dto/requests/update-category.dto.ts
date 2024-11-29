import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    name : string

    @IsOptional()
    @IsString()
    description : string
}
