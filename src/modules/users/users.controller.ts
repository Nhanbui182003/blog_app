import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/requests/create-user.dto';
import { UpdateUserDto } from './dto/requests/update-user.dto';
import { toDto, toPaginateDtos } from 'src/common/tranformers/dto.tranformer';
import { UserProfileResponseDto } from './dto/responses/user-profile.response.dto';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const data = this.usersService.create(createUserDto);
    return toDto(UserProfileResponseDto, data);
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationDto,
  ) {
    const data = await this.usersService.findAll(paginationQuery)
    return toPaginateDtos(UserProfileResponseDto, data)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) throw new HttpException('Invalid UUID format for user ID',400)
    const data = this.usersService.findOne(id);
    return toDto(UserProfileResponseDto, data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) throw new HttpException('Invalid UUID format for user ID',400)
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isUUID(id)) throw new HttpException('Invalid UUID format for user ID',400)
    return this.usersService.remove(id);
  }
}
