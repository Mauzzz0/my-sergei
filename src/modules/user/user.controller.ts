import { Request, Response } from 'express';

import { UnauthorizedException } from '../../errors';
import { authGuard } from '../../guard';
import { BaseController } from '../../shared';
import { Route } from '../../shared/types';
import { validate } from '../../validation';
import { UserService } from './user.service';
import { LoginDto } from './user.types';

export class UserController extends BaseController {
  constructor(private readonly service: UserService) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '/login', method: 'post', handler: this.login },
      { path: '/register', method: 'post', handler: this.register },
      { path: '/profile', handler: this.profile, middlewares: [authGuard] },
      { path: '/logout', method: 'post', handler: this.logout, middlewares: [authGuard] },
    ];

    this.addRoute(routes);
  }

  async profile(req: Request, res: Response) {
    const id = req.session.user?.id;
    if (!id) {
      throw new UnauthorizedException();
    }

    const user = await this.service.profile(id);
    res.json(user);
  }

  async login(req: Request, res: Response) {
    const dto = validate(LoginDto, req.body);

    const user = await this.service.login(dto);

    req.session.user = { id: user.id };

    res.json(user);
  }

  async register(req: Request, res: Response) {
    const dto = validate(LoginDto, req.body);

    const user = await this.service.register(dto);

    res.json(user);
  }

  logout(req: Request, res: Response) {
    req.session.destroy(() => res.json({ success: true }));
  }
}
