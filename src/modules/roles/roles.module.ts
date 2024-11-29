import { Module } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesRepository],
})
export class RolesModule {}
