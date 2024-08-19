import express from 'express';

import { privateGuard } from './guard/private.guard';
import { logMiddleware } from './middlewares';
import { errorHandler } from './middlewares/error.handler';

const server = express();

server.use(logMiddleware);
server.use(privateGuard);

server.get('/task', (req, res) => {
  console.log('Начало обработки запроса!');
  if (Math.random() > 0.5) {
    throw Error('Шанс на ошибку сработал!');
  }

  res.send('Hello World!');
});

server.use(errorHandler);

server.listen(2000);
