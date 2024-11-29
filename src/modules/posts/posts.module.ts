import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../users/users.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { TagsRepository } from '../tags/tags.repository';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, UsersRepository,CategoriesRepository,TagsRepository],
})
export class PostsModule {}
