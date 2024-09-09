import 'reflect-metadata';

import express from 'express';

import { logRoutes } from './bootstrap';
import config from './config';
import { privateGuard } from './guard/private.guard';
import { logMiddleware } from './middlewares';
import { errorHandler } from './middlewares/error.handler';
import { TaskRouter } from './modules/task/task.controller';
import { setupSwagger } from './swagger/setupSwagger';

export const bootstrap = async () => {
  const server = express();

  server.use(express.json());
  server.use(logMiddleware);
  server.use(privateGuard);

  server.use('/task', TaskRouter);

  logRoutes(server);
  setupSwagger(server);

  server.use(errorHandler);

  const port = config.PORT;

  server.listen(port, () => console.log(`Сервер запущен. Порт: ${port}`));
};

bootstrap();
