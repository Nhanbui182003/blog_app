import { NestFactory } from "@nestjs/core"
import { SeedModule } from "./seed.module"
import { RoleSeedService } from "./roles/role-seed.service";
import { UserSeedService } from "./users/user-seed.service";
import { CategorySeedService } from "./categories/category-seed.service";
import { TagSeedService } from "./tags/tag-seed.service";
import { PostSeedService } from "./posts/post-seed.service";


const runSeed = async () => {
    const app = await NestFactory.create(SeedModule);

    //run
    await app.get(RoleSeedService).run();
    await app.get(UserSeedService).run();
    await app.get(CategorySeedService).run();
    await app.get(TagSeedService).run();
    await app.get(PostSeedService).run();
    //close
    await app.close()

   
}

void runSeed()