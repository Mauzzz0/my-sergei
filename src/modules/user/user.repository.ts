import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import { LoginDto, User } from './user.types';

export class UserRepository {
  private readonly storage: User[] = [];

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

  getOneById(id: User['id']): User | undefined {
    return this.storage.find((x) => x.id === id);
  }

  getByNick(nick: User['nick']): User | undefined {
    return this.storage.find((x) => x.nick === nick);
  }

  register(dto: LoginDto): User {
    const maxId = this.storage.sort((a, b) => (a.id < b.id ? 1 : -1))[0]?.id ?? 0;

    this.storage.push({ ...dto, id: maxId + 1 });
    this.writeStorageToFile();

    return this.storage[this.storage.length - 1];
  }
}
