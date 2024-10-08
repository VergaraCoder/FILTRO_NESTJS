import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { seederUser } from './common/database/seeders/seeder.user';
import { seederRole } from './common/database/seeders/seeder.role';
import { FilterErrors } from './common/errors/filter/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const dataSource = app.get(DataSource);
  app.use(cookie(config.get('SIGNED_COOKIE')));

  app.useGlobalFilters(new FilterErrors());

  const roleSeeder = new seederRole();
  await roleSeeder.run(dataSource);

  const userSeeder = new seederUser();
  await userSeeder.run(dataSource);


  app.useGlobalPipes(new ValidationPipe());
  
  const configSwagger = new DocumentBuilder()
    .setTitle('GAMES')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addCookieAuth('access-token-cookie', {
      type: 'apiKey',
      in: 'cookie',
      name: 'token',
    })
    .addCookieAuth('refresh-token-cookie', {
      type: 'apiKey',
      in: 'cookie',
      name: 'tokenRefresh',
    })
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
