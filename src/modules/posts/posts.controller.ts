import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/requests/create-post.dto';
import { UpdatePostDto } from './dto/requests/update-post.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { RolesDecorator } from '../auth/decorators/roles.decorator';
import { UserRole } from '../roles/enums/role.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { toDto, toPaginateDtos } from 'src/common/tranformers/dto.tranformer';
import { PostResponseDTO } from './dto/responses/post.response.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return toDto(PostResponseDTO,this.postsService.create(createPostDto)) ;
  }
 
  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR, UserRole.CUSTOMER)
  @Get()
  async findAll(
    @Query() paginationQuery: PaginationDto
  ) {
    const data = await this.postsService.findAll(paginationQuery)
    return toPaginateDtos(PostResponseDTO,data)
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return toDto(PostResponseDTO,this.postsService.findOne(id)) ;
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return  toDto(PostResponseDTO,this.postsService.update(id, updatePostDto));
    
  }

  @RolesDecorator(UserRole.ADMIN, UserRole.AUTHOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.postsService.remove(id);
    return "delete successfully"
  }
}
