import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', {infer:true}), {exclude: ['/']});
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();