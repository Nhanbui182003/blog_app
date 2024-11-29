import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { BaseRepository } from "src/common/bases/base.repositiry";

@Injectable()
export class CategoriesRepository extends BaseRepository<Category> {
    constructor(private dataSource: DataSource) {
        super(Category, dataSource);
    }
}