import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/requests/create-tag.dto';
import { UpdateTagDto } from './dto/requests/update-tag.dto';
import { TagsRepository } from './tags.repository';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TagsService {
  constructor (
    private tagsRepository: TagsRepository,
  ){}

  create(createTagDto: CreateTagDto) {
    const newTag = this.tagsRepository.create(createTagDto)
    return this.tagsRepository.save(newTag);
  }

  findAll(paginationQuery: PaginationDto) {
    let queryBuilder = this.tagsRepository
      .createQueryBuilder('tag')

    return this.tagsRepository.paginate(queryBuilder,paginationQuery )
  }

  findOne(id: string) {
    const tag = this.tagsRepository.findOneBy({id})
    if (!tag) throw new HttpException('Tag not found', 400)
    
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.tagsRepository.findOneBy({id})
    if (!tag) throw new HttpException('Tag not found', 400)
    console.log(tag,updateTagDto)
    Object.assign(tag,updateTagDto) 
    
    return tag;
  }

  remove(id: string) {
    const tag = this.tagsRepository.findOneBy({id})
    if (!tag) throw new HttpException('Tag not found', 400)

    return this.tagsRepository.delete({id});
  }
}
