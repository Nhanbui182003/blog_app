import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { UserSeedService } from "./user-seed.service";
import { Role } from "src/modules/roles/entities/role.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User,Role])],
    providers: [UserSeedService],
    exports: [UserSeedService],
  })
export class UserSeedModule {}