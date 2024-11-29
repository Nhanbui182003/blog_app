import { Injectable } from "@nestjs/common";
import { Tag } from "./entities/tag.entity";
import { DataSource, Repository } from "typeorm";
import { BaseRepository } from "src/common/bases/base.repositiry";

@Injectable()
export class TagsRepository extends BaseRepository<Tag> {
    constructor(private dataSource: DataSource) {
        super(Tag, dataSource);
      }
}