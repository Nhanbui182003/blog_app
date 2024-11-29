import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { TagsRepository } from './tags.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]),JwtModule.register({})],
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
})
export class TagsModule {}
