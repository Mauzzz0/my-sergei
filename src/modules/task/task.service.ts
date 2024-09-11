import { NotFoundException } from '../../errors';
import { Paginated } from '../../shared';
import { FindAllTasksQueryDto } from './dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.types';

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  getAll(pagination: FindAllTasksQueryDto): Paginated<Task> {
    const items = this.repository.getAll(pagination);

    return {
      total: this.repository.size(),
      limit: pagination.limit,
      offset: pagination.offset,
      items,
    };
  }

  getById(id: Task['id']): Task {
    const task = this.repository.getById(id);

    if (!task) {
      throw new NotFoundException(`Задача [${id}] не найдена!`);
    }

    return task;
  }

  create(dto: Omit<Task, 'id'>): Task {
    return this.repository.create(dto);
  }
}
