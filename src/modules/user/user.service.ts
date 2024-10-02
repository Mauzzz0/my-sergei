import { UserModel } from '../../database/models';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../../errors';
import { LoginDto } from './user.types';

export class UserService {
  async profile(id: UserModel['id']): Promise<UserModel> {
    const user = await UserModel.findByPk(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async login(dto: LoginDto): Promise<UserModel> {
    const user = await UserModel.findOne({ where: { nick: dto.nick } });

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async register(dto: LoginDto): Promise<UserModel> {
    const user = await UserModel.findOne({ where: { nick: dto.nick } });
    if (user) {
      throw new BadRequestException(`Пользователь с ником [${dto.nick}] уже существует!`);
    }

    return await UserModel.create({
      nick: dto.nick,
      password: dto.password,
    });
  }
}
