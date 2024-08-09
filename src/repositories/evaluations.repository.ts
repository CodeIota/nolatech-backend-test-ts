import { Evaluation } from '@interfaces/evaluations.interface';
import evaluationModel from '@models/evaluation.model';
import answerModel from '@/models/answer.model';

class EvaluationRepository {
  private evaluationModel = evaluationModel;

  public async findAll(): Promise<Evaluation[]> {
    return this.evaluationModel.find();
  }

  public async findById(evaluationId: string): Promise<Evaluation | null> {
    return this.evaluationModel.findOne({ _id: evaluationId });
  }

  public async create(evaluationData: Partial<Evaluation>): Promise<Evaluation> {
    return this.evaluationModel.create(evaluationData);
  }

  public async update(evaluationId: string, evaluationData: Partial<Evaluation>): Promise<Evaluation | null> {
    return this.evaluationModel.findByIdAndUpdate(evaluationId, evaluationData, { new: true });
  }

  public async delete(evaluationId: string): Promise<Evaluation | null> {
    return this.evaluationModel.findByIdAndDelete(evaluationId);
  }

  public async findEvaluationsByEmployeeId(employeeId: string): Promise<Evaluation[] | null> {
    return this.evaluationModel.find({ employee: employeeId });
  }

  public async calculateScore(evaluationId: string): Promise<number> {
    const evaluation = await evaluationModel.findById(evaluationId).populate('questions');
    if (!evaluation) throw new Error('Evaluation not found');

    const answers = await answerModel.find({ evaluation: evaluationId });
    let score = 0;
    answers.forEach(answer => {
      score += answer.score;
    });

    evaluation.score = score;
    await evaluation.save();
    return score;
  }

  public async assignEvaluators(employeeId: string): Promise<Evaluation | null> {
    const evaluators = this.evaluationModel.findOne({ employee: employeeId });

    const evaluation = await this.evaluationModel.findOne({ employee: employeeId });
    if (!evaluation) throw new Error('Evaluation not found');

    evaluation.evaluator = (await evaluators)._id;
    await evaluation.save();
    return evaluation;
  }
}

export default EvaluationRepository;
