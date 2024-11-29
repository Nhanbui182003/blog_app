import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/modules/posts/entities/post.entity";
import { PostSeedService } from "./post-seed.service";
import { Category } from "src/modules/categories/entities/category.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Tag } from "src/modules/tags/entities/tag.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Post,Category,User,Tag])
    ],
    providers: [PostSeedService],
    exports: [PostSeedService]
})
export class PostSeedModule {}