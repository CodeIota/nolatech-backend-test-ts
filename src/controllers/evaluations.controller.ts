import { NextFunction, Request, Response } from 'express';
import { CreateEvaluationDto } from '@dtos/evaluations.dto';
import { Evaluation } from '@interfaces/evaluations.interface';
import EvaluationService from '@services/evaluations.service';

class EvaluationsController {
  public evaluationService = new EvaluationService();

  public getEvaluations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllEvaluationsData: Evaluation[] = await this.evaluationService.findAllEvaluations();
      res.status(200).json({ data: findAllEvaluationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEvaluationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const evaluationId: string = req.params.id;
      const findOneEvaluationData: Evaluation = await this.evaluationService.findEvaluationById(evaluationId);
      res.status(200).json({ data: findOneEvaluationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createEvaluation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const evaluationData: CreateEvaluationDto = req.body;
      const createEvaluationData: Evaluation = await this.evaluationService.createEvaluation(evaluationData);
      res.status(201).json({ data: createEvaluationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateEvaluation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const evaluationId: string = req.params.id;
      const evaluationData: CreateEvaluationDto = req.body;
      const updateEvaluationData: Evaluation = await this.evaluationService.updateEvaluation(evaluationId, evaluationData);
      res.status(200).json({ data: updateEvaluationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public submitEvaluation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const evaluationId: string = req.params.id;
      const submitEvaluationData = await this.evaluationService.submitEvaluation(evaluationId);
      res.status(200).json({ data: submitEvaluationData, message: 'submitted' });
    } catch (error) {
      next(error);
    }
  };
}

export default EvaluationsController;
