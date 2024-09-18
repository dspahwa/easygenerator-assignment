import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3100);
  console.log(`[bootstrap] server is running on port: 3100`)
}
bootstrap();
