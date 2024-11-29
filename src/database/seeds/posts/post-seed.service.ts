import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { Post } from "src/modules/posts/entities/post.entity";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostSeedService {
    constructor (
        @InjectRepository(Post) private postRepository : Repository<Post>,
        @InjectRepository(Category) private categoryRepository : Repository<Post>,
        @InjectRepository(User) private userRepository : Repository<User>,
        @InjectRepository(Tag) private tagRepository : Repository<Tag>
    ){}
    
    async run(): Promise<void> {
        await this.fakePost();
    }

    private async fakePost(): Promise<void> {
        const users = await this.userRepository.find();
        const categories = await this.categoryRepository.find();
        const tags = await this.tagRepository.find();
        
        for (var i=0; i<10; i++){
            await this.postRepository.save(
                this.postRepository.create({
                    title: faker.lorem.sentence(),
                    image: faker.image.url(),
                    content: faker.lorem.paragraphs(3),
                    user: users[Math.floor(Math.random() * users.length)], 
                    category: categories[Math.floor(Math.random() * categories.length)],
                    tags: faker.helpers.arrayElements(tags, Math.min(2, tags.length)),
                })
            );
        }
       
        
    }
}