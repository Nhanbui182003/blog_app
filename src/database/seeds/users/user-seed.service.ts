import { faker } from '@faker-js/faker';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/modules/roles/entities/role.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,
  ) {}

  async run(): Promise<void> {
    await this.fakeUser();
  }

  private async fakeUser() : Promise<void> {
    const roles = await this.RoleRepository.find();
    for (var i=0; i<10; i++){
        this.UserRepository.save(
            this.UserRepository.create({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(), 
                email: faker.internet.email(),
                password: await bcrypt.hash("123qwe!@#", 10),
                roles: faker.helpers.arrayElements(roles, Math.min(2, roles.length))
            })
        )
    }
  }
}