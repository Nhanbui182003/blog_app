import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/requests/update-category.dto';
import { RolesGuard } from '../auth/guards/role.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesDecorator } from '../auth/decorators/roles.decorator';
import { UserRole } from '../roles/enums/role.enum';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { toPaginateDtos } from 'src/common/tranformers/dto.tranformer';
import { PostResponseDTO } from '../posts/dto/responses/post.response.dto';
import { CreateCategoryDto } from './dto/requests/create-category.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor( 
    private readonly categoriesService: CategoriesService,
  ) {}

  @RolesDecorator(UserRole.ADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR, UserRole.CUSTOMER)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR, UserRole.CUSTOMER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) throw new HttpException("Category id invalid",400);
    return this.categoriesService.findOne(id);
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR, UserRole.CUSTOMER)
  @Get('posts/list/:id')
  async getAllPostByCategoryId(
    @Param('id') id: string,
    @Query() paginationQuery: PaginationDto
  ){
    console.log("d",id)
    if (!isUUID(id)) throw new HttpException("Category id invalid",400);
    const data = await this.categoriesService.getAllPostByCategoryId(id, paginationQuery);
    return toPaginateDtos(PostResponseDTO, data)
  }


  @RolesDecorator(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    if (!isUUID(id)) throw new HttpException("Category id invalid",400);
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @RolesDecorator(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isUUID(id)) throw new HttpException("Category id invalid",400);
    return this.categoriesService.remove(id);
  }
}
