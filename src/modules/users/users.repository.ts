import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { BaseRepository } from "src/common/bases/base.repositiry";

@Injectable()
export class UsersRepository extends BaseRepository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource);
    }
}