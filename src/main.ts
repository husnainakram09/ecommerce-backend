import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as multer from 'multer';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import path from 'path';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  // const app = await NestFactory.create(AppModule);
  const expressApp = express.default();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  const corsOptions: CorsOptions = {
    origin: '*', // List of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers)
  };
  app.enableCors(corsOptions); // Apply CORS to the app
  // app.useStaticAssets(path.join(__dirname, "../uploads"))
  // Multer configuration
  const storage = multer.memoryStorage(); // Store images in memory
  const upload = multer.default({ storage });

  app.useGlobalInterceptors(upload.any()); // Use multer interceptor

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
