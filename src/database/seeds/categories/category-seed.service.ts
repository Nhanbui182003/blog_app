import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { Repository } from "typeorm";
import { categories } from "../data/category";

@Injectable()
export class CategorySeedService {
    constructor (
        @InjectRepository(Category) private categoriesRepository : Repository<Category>
    ){}
    
    async run(): Promise<void> {
        await this.fakeCategory();
    }

    private async fakeCategory(): Promise<void> {
        for (const category of categories){
            this.categoriesRepository.save(
                this.categoriesRepository.create({
                    name: category.name,
                    description: category.description
                })
            )
        }
        
    }
}