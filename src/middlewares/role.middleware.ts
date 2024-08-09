import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { HttpException } from '@exceptions/HttpException';

const roleMiddleware = (roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      next(new HttpException(403, 'Forbidden'));
    }
  };
};

export default roleMiddleware;
