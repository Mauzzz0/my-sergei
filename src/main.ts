import 'reflect-metadata';

import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import express from 'express';

import { CreateTaskDto, IdNumberDto } from './dto';
import { privateGuard } from './guard/private.guard';
import { logMiddleware } from './middlewares';
import { errorHandler } from './middlewares/error.handler';

const server = express();

server.use(express.json());
server.use(logMiddleware);
server.use(privateGuard);

server.post('/task', (req, res) => {
  const body = plainToInstance(CreateTaskDto, req.body);
  const errors = validateSync(body);

  if (errors.length) {
    const constraints = errors[0].constraints;
    let message = 'Unknown validation error';

    if (constraints) {
      message = constraints[Object.keys(constraints)[0]];
    }

    throw Error(message);
  }

  res.json({ id: 1, ...body });
});

server.get('/task/:id', (req, res) => {
  const params = plainToInstance(IdNumberDto, req.params);
  const errors = validateSync(params);

  if (errors.length) {
    const constraints = errors[0].constraints;
    let message = 'Unknown validation error';

    if (constraints) {
      message = constraints[Object.keys(constraints)[0]];
    }

    throw Error(message);
  }

  res.json({ id: params.id });
});

server.use(errorHandler);

server.listen(2000);
