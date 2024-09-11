import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import { SortBy } from '../../shared';
import { FindAllTasksQueryDto } from './dto';
import { Task } from './task.types';

export class TaskRepository {
  private readonly storage: Task[] = [];

  constructor(private readonly filename: string) {
    if (existsSync(filename)) {
      this.storage = JSON.parse(readFileSync(filename, 'utf-8'));
    } else {
      this.writeStorageToFile();
    }
  }

  private writeStorageToFile = () => writeFileSync(this.filename, JSON.stringify(this.storage));

  size() {
    return this.storage.length;
  }

  getAll(pagination: FindAllTasksQueryDto): Task[] {
    const { sortBy, sort, offset, limit } = pagination;

    return this.storage
      .sort((a, b) => {
        if (a[sort] > b[sort]) {
          return sortBy === SortBy.asc ? 1 : -1;
        }

        return sortBy === SortBy.asc ? -1 : 1;
      })
      .slice(offset, offset + limit);
  }

  getById(id: Task['id']): Task | undefined {
    return this.storage.find((x) => x.id === id);
  }

  create(task: Omit<Task, 'id'>): Task {
    const maxId = this.storage.sort((a, b) => (a.id < b.id ? 1 : -1))[0]?.id ?? 0;

    this.storage.push({ ...task, id: maxId + 1 });
    this.writeStorageToFile();

    return this.storage[this.storage.length - 1];
  }
}
