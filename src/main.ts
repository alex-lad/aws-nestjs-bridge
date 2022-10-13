import { NestFactory } from '@nestjs/core';
import { CloudwatchModule } from './Modules/cloudwatch.module';

async function bootstrap() {
  const app = await NestFactory.create(CloudwatchModule);
  await app.listen(3000);
}
bootstrap();
