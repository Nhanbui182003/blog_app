import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { Repository } from "typeorm";
import { tagNames } from "../data/tag";

@Injectable()
export class TagSeedService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async run(): Promise<void> {
    await this.fakeTag();
  }

  private async fakeTag() : Promise<void> {
    for (const tag of tagNames) {
      await this.tagRepository.save(
        this.tagRepository.create({
            name: tag
        }),
      );
    }
  }
}
