import { NestFactory } from '@nestjs/core';
import { PORT_NUMBER } from './common/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  await server.listen(PORT_NUMBER);
}

bootstrap();
