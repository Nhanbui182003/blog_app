import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequestDto } from './dto/requests/auth-login.request.dto';
import { AuthLoginResponseDto } from './dto/responses/auth-login.response.dto';
import { toDto } from 'src/common/tranformers/dto.tranformer';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() loginDto:  AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    const response = this.authService.login(loginDto);
    return toDto(AuthLoginResponseDto,response);
  }
}
