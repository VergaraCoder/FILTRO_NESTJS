import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=app.get(ConfigService);
  app.use(cookie(config.get("SIGNED_COOKIE")));
  await app.listen(3000);
}
bootstrap();
