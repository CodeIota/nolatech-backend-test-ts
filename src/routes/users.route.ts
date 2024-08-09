import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import roleMiddleware from '@middlewares/role.middleware';

class UsersRoute implements Routes {
  public path = '/api/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, roleMiddleware(['admin', 'manager']), this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin', 'manager']), this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      roleMiddleware(['admin', 'manager']),
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin']), this.usersController.deleteUser);
  }
}

export default UsersRoute;
