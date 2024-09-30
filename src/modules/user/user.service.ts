import { NotFoundException, UnauthorizedException } from '../../errors';
import { UserRepository } from './user.repository';
import { LoginDto, User } from './user.types';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  profile(id: User['id']): User {
    const user = this.repository.getOneById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  login(dto: LoginDto): User {
    const user = this.repository.getByNick(dto.nick);

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  register(dto: LoginDto): User {
    return this.repository.register(dto);
  }
}
