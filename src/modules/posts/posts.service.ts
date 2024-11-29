import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/requests/create-post.dto';
import { UpdatePostDto } from './dto/requests/update-post.dto';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../users/users.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { TagsRepository } from '../tags/tags.repository';
import { In } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PostsService {
  constructor (
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
    private categoriesRepository: CategoriesRepository,
    private tagsRepository: TagsRepository
  ) {}

  async create({userId,categoryId,tagIds, ...createPostDto}: CreatePostDto) {
    const findedUser = await this.usersRepository.findOne({
      where: {id: userId}
    })
    if (!findedUser) throw new HttpException('User not found!',400)
    
    const findedCategory = await this.categoriesRepository.findOne({
      where: {id: categoryId},
      relations: ['posts']
    })
    if (!findedCategory) throw new HttpException('Category not found!',400)

    const findedtags = await this.tagsRepository.find({
      where: {id: In(tagIds)}
    })

    const newPost = this.postsRepository.create({
      category: findedCategory,
      user: findedUser,
      tags: findedtags,
      ...createPostDto
    })

    return this.postsRepository.save(newPost)
  }

  async findAll(paginationQuery: PaginationDto) {
    let queryBuilder = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag');
    return this.postsRepository.paginate(queryBuilder, paginationQuery)
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOne({
      where: {id},
      relations: ['tags']
    })

    if (!post) throw new HttpException('Post not found!', 404);

    return post;
  }

  async update(id: string, {userId,categoryId,tagIds,...updatePostDto}: UpdatePostDto) {
    const findedPost = await this.findOne(id)

    if (userId){
      const findedUser = await this.usersRepository.findOne({
        where: {id: userId}
      })
      if (!findedUser) throw new HttpException('User not found!',400)
      findedPost.user = findedUser
    }
    
    if (categoryId) {
      const findedCategory = await this.categoriesRepository.findOne({
        where: {id: categoryId},
        relations: ['posts']
      })
      if (!findedCategory) throw new HttpException('Category not found!',400)
      findedPost.category = findedCategory;
    }
   
    if (tagIds) {
      const findedtags = await this.tagsRepository.find({
        where: {id: In(tagIds)}
      })

      findedPost.tags = findedtags
    }

    Object.assign(findedPost, updatePostDto)
    return await this.postsRepository.save(findedPost)
    
  }

  async remove(id: string) {
    const post = await this.postsRepository.findOne({
      where: {id},
      relations: ['tags']
    })

    if (!post) throw new HttpException('Post not found!', 404);
   
    return  await this.postsRepository.delete({id});
  }
}
