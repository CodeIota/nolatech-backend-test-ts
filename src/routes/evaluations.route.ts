import { Router } from 'express';
import EvaluationsController from '@controllers/evaluations.controller';
import { CreateEvaluationDto } from '@dtos/evaluations.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import roleMiddleware from '@middlewares/role.middleware';

class EvaluationsRoute implements Routes {
  public path = '/api/evaluations';
  public router = Router();
  public evaluationsController = new EvaluationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, roleMiddleware(['admin', 'manager']), this.evaluationsController.getEvaluations);
    this.router.get(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin', 'manager']), this.evaluationsController.getEvaluationById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      roleMiddleware(['admin']),
      validationMiddleware(CreateEvaluationDto, 'body'),
      this.evaluationsController.createEvaluation,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      roleMiddleware(['admin']),
      validationMiddleware(CreateEvaluationDto, 'body', true),
      this.evaluationsController.updateEvaluation,
    );
    this.router.put(`${this.path}/:id/submit`, authMiddleware, roleMiddleware(['admin', 'manager']), this.evaluationsController.submitEvaluation);
  }
}

export default EvaluationsRoute;
