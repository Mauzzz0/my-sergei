import { TaskModel } from '../../database/models';
import { NotFoundException } from '../../errors';
import { Paginated } from '../../shared';
import { CreateTaskDto, FindAllTasksQueryDto } from './dto';

export class TaskService {
  async getAll(pagination: FindAllTasksQueryDto): Promise<Paginated<TaskModel>> {
    // TODO: sort, sortBy
    const { rows, count } = await TaskModel.findAndCountAll(pagination);

    return {
      total: count,
      limit: pagination.limit,
      offset: pagination.offset,
      items: rows,
    };
  }

  async getById(id: TaskModel['id']): Promise<TaskModel> {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      throw new NotFoundException(`Задача [${id}] не найдена!`);
    }

    return task;
  }

  async create(dto: CreateTaskDto): Promise<TaskModel> {
    return TaskModel.create({
      title: dto.title,
      description: dto.description,
    });
  }
}
