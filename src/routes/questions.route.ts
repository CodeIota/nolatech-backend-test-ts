import { Router } from 'express';
import QuestionsController from '@controllers/questions.controller';
import { CreateQuestionDto } from '@dtos/questions.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import roleMiddleware from '@middlewares/role.middleware';

class QuestionsRoute implements Routes {
  public path = '/api/questions';
  public router = Router();
  public questionsController = new QuestionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, roleMiddleware(['admin', 'manager']), this.questionsController.getQuestions);
    this.router.get(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin', 'manager']), this.questionsController.getQuestionById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      roleMiddleware(['admin']),
      validationMiddleware(CreateQuestionDto, 'body'),
      this.questionsController.createQuestion,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      roleMiddleware(['admin']),
      validationMiddleware(CreateQuestionDto, 'body', true),
      this.questionsController.updateQuestion,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, roleMiddleware(['admin']), this.questionsController.deleteQuestion);
  }
}

export default QuestionsRoute;
