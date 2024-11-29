import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/requests/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/requests/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UsersRepository } from './users.repository';
import { RolesRepository } from '../roles/roles.repository';
@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private roleRepository: RolesRepository,
  ) {}

  //create new user
  async create({ email, password, roles, ...createUserDto }: CreateUserDto) {
    const userroles = await this.roleRepository.find({
      where: { value: In(roles) },
    });
    if (!roles) throw new HttpException('Role invalid!', 400);

    const existingEmail = await this.userRepository.findOneBy({ email });
    if (existingEmail) throw new HttpException('Email is existed!', 400);

    const newuser = this.userRepository.create({
      email,
      password: await bcrypt.hash(password, 10),
      roles: userroles,
      ...createUserDto,

    });
    return this.userRepository.save(newuser);
  }

  //get all users
  async findAll(paginationQuery: PaginationDto) {
    let queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role');
    return this.userRepository.paginate(queryBuilder, paginationQuery);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) throw new HttpException('User not found!', 404);

    return user;
  }

  //find user by enmail
  async findByEmail(email: string){
    return await this.userRepository.findOne({
      where: {email},
      relations: ['roles']
    })
  }

  //update user
  async update(
    id: string,
    { email, password, roles, ...updateUserDto }: UpdateUserDto,
  ) {
    const user = await this.findOne(id);

    if (email && email !== user.email) {
      const existingEmail = await this.userRepository.findOneBy({ email });
      if (existingEmail) throw new HttpException('Email is existed!', 400);
      user.email = email;
    }

    if (roles) {
      const userRoles = await this.roleRepository.find({
        where: { value: In(roles) },
      });

      if (userRoles.length !== roles.length) {
        throw new HttpException('Some roles are invalid!', 400);
      }
      user.roles = userRoles;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Update other fields dynamically
    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);

    return user;
  }

  //remove user
  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) throw new HttpException('User not found!', 404);
    this.userRepository.delete({ id });
    return null;
  }
}
