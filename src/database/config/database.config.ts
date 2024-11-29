import { registerAs } from "@nestjs/config";
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { DatabaseConfig } from "./database-config.type";
import validateConfig from "src/utils/validate-config";


class EnvironmentVariablesValidator {
    @IsString()
    DATABASE_HOST: string;
  
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    DATABASE_PORT: number;
  
    @IsString()
    @IsOptional()
    DATABASE_PASSWORD: string;


    @IsString()
    DATABASE_NAME: string;
  
    @IsString()
    DATABASE_USERNAME: string;
  
    @IsBoolean()
    @IsOptional()
    DATABASE_SYNCHRONIZE: boolean;

    @IsString()
    @IsOptional()
    DATABASE_SCHEMA: string;
}

export default registerAs<DatabaseConfig>('database', () => {
    validateConfig(process.env, EnvironmentVariablesValidator);
  
    return {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      schema: process.env.DATABASE_SCHEMA,
    };
  });