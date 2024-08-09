import { Question } from '@interfaces/questions.interface';
import questionModel from '@models/question.model';

class QuestionRepository {
  private questionModel = questionModel;

  public async findAll(): Promise<Question[]> {
    return this.questionModel.find();
  }

  public async findById(questionId: string): Promise<Question | null> {
    return this.questionModel.findOne({ _id: questionId });
  }

  public async create(questionData: Partial<Question>): Promise<Question> {
    return this.questionModel.create(questionData);
  }

  public async update(questionId: string, questionData: Partial<Question>): Promise<Question | null> {
    return this.questionModel.findByIdAndUpdate(questionId, questionData, { new: true });
  }

  public async delete(questionId: string): Promise<Question | null> {
    return this.questionModel.findByIdAndDelete(questionId);
  }

  public async findByEvaluationId(evaluationId: string): Promise<Question[]> {
    return this.questionModel.find({ evaluation: evaluationId });
  }
}

export default QuestionRepository;
