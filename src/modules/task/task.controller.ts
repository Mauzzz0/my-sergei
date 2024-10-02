import { Request, Response } from 'express';

import { authGuard } from '../../guard';
import { BaseController, IdNumberDto } from '../../shared';
import { Route } from '../../shared/types';
import { validate } from '../../validation';
import { CreateTaskDto, FindAllTasksQueryDto } from './dto';
import { TaskService } from './task.service';

export class TaskController extends BaseController {
  constructor(private readonly service: TaskService) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const middlewares = [authGuard];

    const routes: Route[] = [
      { path: '/', handler: this.getAll, middlewares },
      { path: '/:id', handler: this.getById, middlewares },
      { path: '/', method: 'post', handler: this.create, middlewares },
    ];

    this.addRoute(routes);
  }

  getAll(req: Request, res: Response) {
    const query = validate(FindAllTasksQueryDto, req.query);
    const result = this.service.getAll(query);
    res.json(result);
  }

  getById(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const task = this.service.getById(id);

    res.json(task);
  }

  create(req: Request, res: Response) {
    const dto = validate(CreateTaskDto, req.body);

    const task = this.service.create(dto);

    res.json(task);
  }
}
