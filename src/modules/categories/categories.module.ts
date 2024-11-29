import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categories } from 'src/database/seeds/data/category';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './categories.repository';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, PostsRepository],
})
export class CategoriesModule {}
