import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
import Cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });/*
  app.use(
    Cors({
      origin: "http://localhost:3000",
    })
  )*/
  app.enableCors({
    origin:'http://localhost:3000'
  })
  await app.listen(4200);
}
bootstrap();

