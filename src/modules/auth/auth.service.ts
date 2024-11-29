import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import ms from 'ms';
import { AuthLoginRequestDto } from './dto/requests/auth-login.request.dto';
import { AuthLoginResponseDto } from './dto/responses/auth-login.response.dto';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService : JwtService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found!',404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new HttpException('Incorrect email or password', 404)
    }
    
    //
  }

  async login(body: AuthLoginRequestDto): Promise<AuthLoginResponseDto>{
    const user = await this.usersService.findByEmail(body.email);

    if (!user) {
      throw new HttpException('User not found!',404);
    }

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) {
      throw new HttpException('Incorrect email or password', 404)
    }
    
    const tokenData = await this.generateToken({
      id : user.id,
      roles: user.roles,
      email: user.email,
    });

    return {...tokenData, user } as AuthLoginResponseDto
   
  }
  
  private async generateToken(data: {
    id: string;
    roles?: Role[];
    email: string;
  }) {
    const tokenExpiresIn = this.configService.getOrThrow<string>('auth.expires', { infer: true });  
    const secret = this.configService.getOrThrow<string>('auth.secret', { infer: true });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const token = await this.jwtService.signAsync(
      {
        id: data.id,
        roles: data.roles,
        email: data.email,
      },
      {
        secret,
        expiresIn: tokenExpiresIn,
      },
    );

    return {
      token,
      tokenExpires,
    };
  }
}