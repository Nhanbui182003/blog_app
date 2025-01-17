import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { RolesRepository } from '../roles/roles.repository';

@Module({
  imports: [ 
    UsersModule, 
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, RolesRepository],
})
export class AuthModule {}
