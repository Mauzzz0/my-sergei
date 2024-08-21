import { Request, Response } from 'express';

import { CreateTaskDto, IdNumberDto } from '../../dto';
import { validate } from '../../validation';
import { TaskService } from './task.service';

export const TaskController = {
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
