import { Router } from 'express';
import EmployeesController from '@controllers/employees.controller';
import { CreateEmployeeDto } from '@dtos/employees.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import roleMiddleware from '@middlewares/role.middleware';

class EmployeesRoute implements Routes {
  public path = '/api/employees';
  public router = Router();
  public employeesController = new EmployeesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, roleMiddleware(['admin', 'manager']), this.employeesController.getEmployees);
    this.router.get(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin', 'manager']), this.employeesController.getEmployeeById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      roleMiddleware(['admin']),
      validationMiddleware(CreateEmployeeDto, 'body'),
      this.employeesController.createEmployee,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      roleMiddleware(['admin']),
      validationMiddleware(CreateEmployeeDto, 'body', true),
      this.employeesController.updateEmployee,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin']), this.employeesController.deleteEmployee);
  }
}

export default EmployeesRoute;
