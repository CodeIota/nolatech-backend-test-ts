import { Answer } from '@interfaces/answers.interface';
import answerModel from '@models/answer.model';

class AnswerRepository {
  private answerModel = answerModel;

  public async findAll(): Promise<Answer[]> {
    return this.answerModel.find();
  }

  public async findById(answerId: string): Promise<Answer | null> {
    return this.answerModel.findOne({ _id: answerId });
  }

  public async create(answerData: Partial<Answer>): Promise<Answer> {
    return this.answerModel.create(answerData);
  }

  public async update(answerId: string, answerData: Partial<Answer>): Promise<Answer | null> {
    return this.answerModel.findByIdAndUpdate(answerId, answerData, { new: true });
  }

  public async delete(answerId: string): Promise<Answer | null> {
    return this.answerModel.findByIdAndDelete(answerId);
  }

  public async findByQuestionId(questionId: string): Promise<Answer[]> {
    return this.answerModel.find({ question: questionId });
  }
}

export default AnswerRepository;
