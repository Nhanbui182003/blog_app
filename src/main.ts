import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/login.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', {infer:true}), {exclude: ['/']});
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(
    new LoggingInterceptor()
  );
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
