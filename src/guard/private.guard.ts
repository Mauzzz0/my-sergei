import { NextFunction, Request, Response } from 'express';

export const privateGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('/private')) {
    res.status(403).json({ message: 'It is forbidden' });
    return;
  }

  next();
};
