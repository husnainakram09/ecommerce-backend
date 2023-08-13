import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';
import { createExpressAdapter } from './express.adapter';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(
    AppModule,
    createExpressAdapter()
  );
  // Multer configuration
  const storage = multer.memoryStorage(); // Store images in memory
  const upload = multer({ storage });

  app.useGlobalInterceptors(upload.any()); // Use multer interceptor

  await app.listen(3000);
}
bootstrap();
