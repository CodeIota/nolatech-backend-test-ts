import { CreateEvaluationDto } from '@dtos/evaluations.dto';
import { HttpException } from '@exceptions/HttpException';
import { Evaluation } from '@interfaces/evaluations.interface';
import { isEmpty } from '@utils/util';
import EvaluationRepository from '@repositories/evaluations.repository';
import NotifationService from './notification.service';
import { ConsoleLogger } from '@utils/Observer/ConsoleLogger.observer';

class EvaluationService {
  private evaluationRepository = new EvaluationRepository();
  private notificationService = new NotifationService();
  private consoleLogger = new ConsoleLogger();

  public async findAllEvaluations(): Promise<Evaluation[]> {
    const evaluations: Evaluation[] = await this.evaluationRepository.findAll();
    return evaluations;
  }

  public async findEvaluationById(evaluationId: string): Promise<Evaluation> {
    if (isEmpty(evaluationId)) throw new HttpException(400, 'EvaluationId is empty');

    const findEvaluation: Evaluation = await this.evaluationRepository.findById(evaluationId);
    if (!findEvaluation) throw new HttpException(409, "Evaluation doesn't exist");

    return findEvaluation;
  }

  public async createEvaluation(evaluationData: CreateEvaluationDto): Promise<Evaluation> {
    if (isEmpty(evaluationData)) throw new HttpException(400, 'evaluationData is empty');

    const createEvaluationData: Evaluation = await this.evaluationRepository.create(evaluationData);
    return createEvaluationData;
  }

  public async updateEvaluation(evaluationId: string, evaluationData: CreateEvaluationDto): Promise<Evaluation> {
    if (isEmpty(evaluationData)) throw new HttpException(400, 'evaluationData is empty');

    const updateEvaluationById: Evaluation = await this.evaluationRepository.update(evaluationId, evaluationData);
    if (!updateEvaluationById) throw new HttpException(409, "Evaluation doesn't exist");

    return updateEvaluationById;
  }

  public async submitEvaluation(evaluationId: string): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findById(evaluationId);
    if (!evaluation) throw new HttpException(409, "Evaluation doesn't exist");

    this.notificationService.registerObserver(this.consoleLogger);

    const message = `Evaluation ${evaluation._id} is pending.`;
    this.notificationService.notify(message);

    return this.evaluationRepository.update(evaluationId, evaluation);
  }

  public async findEvaluationsByEmployeeId(employeeId: string): Promise<Evaluation[]> {
    return this.evaluationRepository.findEvaluationsByEmployeeId(employeeId);
  }
}

export default EvaluationService;
