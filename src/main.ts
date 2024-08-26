import 'reflect-metadata';

import express from 'express';

import { logRoutes } from './bootstrap';
import { privateGuard } from './guard/private.guard';
import { logMiddleware } from './middlewares';
import { errorHandler } from './middlewares/error.handler';
import { TaskRouter } from './modules/task/task.controller';

export const bootstrap = async () => {
  const server = express();

  server.use(express.json());
  server.use(logMiddleware);
  server.use(privateGuard);

  server.use('/task', TaskRouter);

  logRoutes(server);

  server.use(errorHandler);

  server.listen(2000, () => console.log('Сервер запущен!'));
};

bootstrap();
