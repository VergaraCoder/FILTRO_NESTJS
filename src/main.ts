import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { seederUser } from './common/database/seeders/seeder.user';
import { seederRole } from './common/database/seeders/seeder.role';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=app.get(ConfigService);
  const dataSource=app.get(DataSource);
  app.use(cookie(config.get("SIGNED_COOKIE")));

  const userSeeder=new seederUser();
  await userSeeder.run(dataSource);


  const roleSeeder=new seederRole();
  await roleSeeder.run(dataSource);

  await app.listen(3000);
}
bootstrap();
