import { NextFunction, Request, Response } from 'express';
import { CreateAnswerDto } from '@dtos/answers.dto';
import { Answer } from '@interfaces/answers.interface';
import AnswerService from '@services/answers.service';

class AnswersController {
  public answerService = new AnswerService();

  public getAnswers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAnswersData: Answer[] = await this.answerService.findAllAnswers();
      res.status(200).json({ data: findAllAnswersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAnswerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const answerId: string = req.params.id;
      const findOneAnswerData: Answer = await this.answerService.findAnswerById(answerId);
      res.status(200).json({ data: findOneAnswerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const answerData: CreateAnswerDto = req.body;
      const createAnswerData: Answer = await this.answerService.createAnswer(answerData);
      res.status(201).json({ data: createAnswerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const answerId: string = req.params.id;
      const answerData: CreateAnswerDto = req.body;
      const updateAnswerData: Answer = await this.answerService.updateAnswer(answerId, answerData);
      res.status(200).json({ data: updateAnswerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const answerId: string = req.params.id;
      const deleteAnswerData: Answer = await this.answerService.deleteAnswer(answerId);
      res.status(200).json({ data: deleteAnswerData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AnswersController;
