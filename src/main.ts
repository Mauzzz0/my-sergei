import 'reflect-metadata';

import express from 'express';

import { logRoutes } from './bootstrap';
import config from './config';
import { privateGuard } from './guard/private.guard';
import { logMiddleware } from './middlewares';
import { errorHandler } from './middlewares/error.handler';
import { taskController } from './modules/task/task.module';
import { setupSwagger } from './swagger/setupSwagger';

export const bootstrap = async () => {
  const server = express();

  server.use(express.json());
  server.use(logMiddleware);
  server.use(privateGuard);

  server.use('/task', taskController.router);

  logRoutes(server);
  setupSwagger(server);

  server.use(errorHandler);

  const port = config.port;

  server.listen(port, () => console.log(`Сервер запущен. Порт: ${port}`));
};

bootstrap();
