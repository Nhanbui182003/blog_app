import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto  {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;


    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    categoryId: string;

    @IsArray()
    @IsOptional()
    tagIds?: string[];
}
