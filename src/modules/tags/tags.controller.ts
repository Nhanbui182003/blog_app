import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/requests/create-tag.dto';
import { UpdateTagDto } from './dto/requests/update-tag.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { RolesDecorator } from '../auth/decorators/roles.decorator';
import { UserRole } from '../roles/enums/role.enum';
import { toDto } from 'src/common/tranformers/dto.tranformer';
import { TagResponseDto } from './dto/responses/tag.response.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR)
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return toDto(TagResponseDto, this.tagsService.create(createTagDto));
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR, UserRole.CUSTOMER)
  @Get()
  findAll(@Query() paginationQuery: PaginationDto) {
    return this.tagsService.findAll(paginationQuery);
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR, UserRole.CUSTOMER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id))
      throw new HttpException('Invalid UUID format for tag ID', 400);

    return toDto(TagResponseDto, this.tagsService.findOne(id));
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return toDto(TagResponseDto, this.tagsService.update(id, updateTagDto));
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.tagsService.remove(id);
    return 'delete successfully';
  }
}
