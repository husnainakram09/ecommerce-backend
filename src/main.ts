import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as multer from 'multer';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const expressApp: express.Application = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  // Multer configuration
  const storage = multer.memoryStorage(); // Store images in memory
  const upload = multer({ storage });

  app.useGlobalInterceptors(upload.any()); // Use multer interceptor

  await app.listen(3000);
}
bootstrap();
