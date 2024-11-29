import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { RolesRepository } from '../roles/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, RolesRepository],
  exports: [UsersService]
})
export class UsersModule {}
