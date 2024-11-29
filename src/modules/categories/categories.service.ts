import { HttpException, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/requests/update-category.dto';
import { CategoriesRepository } from './categories.repository';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { PostsRepository } from '../posts/posts.repository';
import { CreateCategoryDto } from './dto/requests/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor (
    private categoriesRepository: CategoriesRepository,
    private postsRepository: PostsRepository
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(newCategory)
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: string) {
    return await this.categoriesRepository.findOneBy({id})
  }

  getAllPostByCategoryId(id: string, paginationQuery: PaginationDto) {
    let queryBuilder: SelectQueryBuilder<Post> = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags','tag')
      .leftJoinAndSelect('post.category', 'category')
      .where('category.id = :id',{id})
    
    return this.postsRepository.paginate(queryBuilder, paginationQuery)
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({id})
    if (!category) throw new HttpException("Category not found!", 404)

    Object.assign(category,updateCategoryDto)
    return this.categoriesRepository.save(category)
  }

  async remove(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: {id},
      relations: ['posts']
    })

    if (!category) throw new HttpException("Category not found!", 404)

    if (category.posts.length > 0) {
      await this.postsRepository.remove(category.posts); // Optionally delete posts
    }

    return await this.categoriesRepository.remove(category)
  }
}
