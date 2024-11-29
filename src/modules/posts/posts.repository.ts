import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { BaseRepository } from "src/common/bases/base.repositiry";

@Injectable()
export class PostsRepository extends BaseRepository<Post> {
    constructor(private dataSource: DataSource) {
        super(Post, dataSource);
      }
}