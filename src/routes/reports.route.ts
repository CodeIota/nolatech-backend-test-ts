import { Router } from 'express';
import ReportsController from '@controllers/reports.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import roleMiddleware from '@middlewares/role.middleware';

class ReportsRoute implements Routes {
  public path = '/api/reports';
  public router = Router();
  public reportsController = new ReportsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/employee/:id`, authMiddleware, roleMiddleware(['admin', 'manager']), this.reportsController.getEmployeeReport);
    this.router.get(`${this.path}/department/:id`, authMiddleware, roleMiddleware(['admin', 'manager']), this.reportsController.getDepartmentReport);
  }
}

export default ReportsRoute;
