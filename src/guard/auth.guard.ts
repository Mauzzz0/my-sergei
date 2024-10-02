import { NextFunction, Request, Response } from 'express';

import { UnauthorizedException } from '../errors';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const id = req.session.user?.id;

  if (!id) {
    throw new UnauthorizedException();
  }

  next();
};
