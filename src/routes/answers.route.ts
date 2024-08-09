import { Router } from 'express';
import AnswersController from '@controllers/answers.controller';
import { CreateAnswerDto } from '@dtos/answers.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import roleMiddleware from '@middlewares/role.middleware';

class AnswersRoute implements Routes {
  public path = '/api/answers';
  public router = Router();
  public answersController = new AnswersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, roleMiddleware(['admin', 'manager']), this.answersController.getAnswers);
    this.router.get(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin', 'manager']), this.answersController.getAnswerById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      roleMiddleware(['admin']),
      validationMiddleware(CreateAnswerDto, 'body'),
      this.answersController.createAnswer,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      roleMiddleware(['admin']),
      validationMiddleware(CreateAnswerDto, 'body', true),
      this.answersController.updateAnswer,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin']), this.answersController.deleteAnswer);
  }
}

export default AnswersRoute;
