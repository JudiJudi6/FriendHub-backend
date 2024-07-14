import { NextFunction, Request, Response } from "express";

export function catchAsync(fn: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
