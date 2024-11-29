import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLoginRequestDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }
  