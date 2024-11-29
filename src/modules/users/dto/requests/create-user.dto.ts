import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/modules/roles/enums/role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(UserRole, { each: true }) 
    roles: UserRole[];
}
