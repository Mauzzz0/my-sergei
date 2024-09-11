import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) next();

  const status = err?.status ?? 500;
  const message = err?.status ? err.message : 'Internal Server Error';

  res.status(status).json({ code: 'Error', message });
};
