import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpErrorFilter } from './modules/errors/http-error.filter';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(AppModule.name, { timestamp: true }),
    cors: {
      origin: '*',
      allowedHeaders: [
        'Origin',
        'Content-Type',
        'Accept',
        'Authorization',
        'User-Agent',
        'code',
        'Gplatform',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'HEAD'],
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // i supose this creates a white list with properties
      forbidNonWhitelisted: true, // i supose this restrict by white list criteria
      forbidUnknownValues: true, // i dont know why exists
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpErrorFilter());

  console.log(`Start on port: ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
