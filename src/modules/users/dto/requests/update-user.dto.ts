import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/modules/roles/enums/role.enum";

export class UpdateUserDto{
    @IsOptional()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsString()
    @IsOptional()
    password: string;

    @IsOptional()
    @IsArray()
    @IsEnum(UserRole, { each: true }) 
    roles: UserRole[];
}
