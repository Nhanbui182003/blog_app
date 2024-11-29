import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsString()
    description : string
}