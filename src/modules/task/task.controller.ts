import express, { Request, Response } from 'express';

import { CreateTaskDto } from '../../dto';
import { IdNumberDto } from '../../shared';
import { validate } from '../../validation';
import { FindAllTasksQueryDto } from './dto';
import { TaskService } from './task.service';

const TaskController = {
  getAll(req: Request, res: Response) {
    const query = validate(FindAllTasksQueryDto, req.query);
    const result = TaskService.getAll(query);
    res.json(result);
  },

  getById(req: Request, res: Response) {
    const { id } = validate(IdNumberDto, req.params);

    const task = TaskService.getById(id);

    res.json(task);
  },

  create(req: Request, res: Response) {
    const dto = validate(CreateTaskDto, req.body);

    const task = TaskService.create(dto);

    res.json(task);
  },
};

export const TaskRouter = express.Router();

TaskRouter.get('', TaskController.getAll);
TaskRouter.get('/:id', TaskController.getById);
TaskRouter.post('', TaskController.create);
