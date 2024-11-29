import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { TagSeedService } from "./tag-seed.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    providers: [TagSeedService],
    exports: [TagSeedService],
})
export class TagSeedModule {}