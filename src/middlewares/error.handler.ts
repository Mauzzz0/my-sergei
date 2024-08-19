import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) next();

  res.status(500).json({
    code: 'Error',
    message: err.message,
  });
};
