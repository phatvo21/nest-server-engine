import fastifyCookie from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCsrf from 'fastify-csrf';
import { Logger } from 'nestjs-pino';

import { AllExceptionsFilter } from './all-exceptions.filter';
import { getAdapter } from './fastify.util';
import { getCommitHash } from './gitCommitHash.util';
import { AddSwagger } from './swagger.util';

export const bootstrap = async (appModule, swaggerConfig: { title: string; server: string }): Promise<void> => {
  const adapter: FastifyAdapter = getAdapter();
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(appModule, adapter);

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());

  const config: ConfigService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: (_, cb): void => {
      cb(null, true);
    },
  });

  await app.register(fastifyCookie);
  await app.register(fastifyCsrf);

  app.useGlobalFilters(new AllExceptionsFilter());
  const appHost: string = config.get<string>('app.host', process.env.HOST);
  const appPort: number = config.get<number>('app.port', +process.env.PORT);
  const commitHash: string = config.get<string>('COMMIT_HASH') || getCommitHash();
  AddSwagger(app, swaggerConfig.title, swaggerConfig.server, commitHash);

  await app.startAllMicroservices();
  await app.listen(appPort, appHost);
  console.info(`Swagger Url: ${appHost}:${appPort}${swaggerConfig.server}`);
};
