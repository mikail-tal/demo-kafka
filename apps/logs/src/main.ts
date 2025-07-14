import { NestFactory } from '@nestjs/core';
import { LogsModule } from './logs.module';

async function bootstrap() {
  const app = await NestFactory.create(LogsModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
