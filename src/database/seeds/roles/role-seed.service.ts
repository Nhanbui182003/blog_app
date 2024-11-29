import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/modules/roles/entities/role.entity";
import { Repository } from "typeorm";
import { roles } from "../data/role";

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async run(): Promise<void> {
    await this.fakeRole();
  }

  private async fakeRole() : Promise<void> {
    for (const role of roles) {
      await this.roleRepository.save(
        this.roleRepository.create({
          id: role.id,
          value: role.value,
        }),
      );
    }
  }
}
