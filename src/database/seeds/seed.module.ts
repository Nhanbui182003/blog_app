import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "../config/database.config";
import appConfig from "src/config/app.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "../typeorm-config.service";
import { DataSource, DataSourceOptions } from "typeorm";
import { UserSeedModule } from "./users/user-seed.module";
import { CategorySeedModule } from "./categories/category-seed.module";
import { PostSeedModule } from "./posts/post-seed.module";
import { RoleSeedModule } from "./roles/role-seed.module";
import { TagSeedModule } from "./tags/tag-seed.module";

@Module({
    imports: [
        UserSeedModule,
        CategorySeedModule,
        PostSeedModule,
        RoleSeedModule,
        TagSeedModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig],
            envFilePath: ['.env'],
          }),
          TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (options: DataSourceOptions) => {
              return new DataSource(options).initialize();
            },
          }),
    ],

})
export class SeedModule {}