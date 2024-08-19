import { NextFunction, Request, Response } from 'express';

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Пришел запрос с методом ${req.method}`);
  next();
};
