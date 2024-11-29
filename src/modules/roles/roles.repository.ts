import { Injectable } from "@nestjs/common";
import { Role } from "./entities/role.entity";
import { DataSource, Repository } from "typeorm";
import { BaseRepository } from "src/common/bases/base.repositiry";
import { EntityHelper } from "src/utils/entity-hepler";

@Injectable()
export class RolesRepository extends BaseRepository<Role>{
  constructor(private dataSource: DataSource) {
    super(Role, dataSource);
  }
}