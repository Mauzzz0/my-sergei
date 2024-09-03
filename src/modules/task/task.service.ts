import { Paginated } from '../../shared';
import { FindAllTasksQueryDto } from './dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.types';

export const TaskService = {
  getAll(pagination: FindAllTasksQueryDto): Paginated<Task> {
    const items = TaskRepository.getAll(pagination);

    return {
      total: TaskRepository.size(),
      limit: pagination.limit,
      offset: pagination.offset,
      items,
    };
  },

  getById(id: Task['id']): Task {
    const task = TaskRepository.getById(id);

    if (!task) {
      throw Error(`Задача [${id}] не найдена!`);
    }

    return task;
  },

  create(dto: Omit<Task, 'id'>): Task {
    return TaskRepository.create(dto);
  },
};
