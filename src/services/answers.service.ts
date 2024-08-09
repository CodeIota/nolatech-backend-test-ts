import { CreateAnswerDto } from '@dtos/answers.dto';
import { Answer } from '@interfaces/answers.interface';
import AnswerRepository from '@repositories/answers.repository';

class AnswerService {
  private answerRepository = new AnswerRepository();

  public async findAllAnswers(): Promise<Answer[]> {
    return this.answerRepository.findAll();
  }

  public async findAnswerById(answerId: string): Promise<Answer> {
    const findAnswer = await this.answerRepository.findById(answerId);
    if (!findAnswer) throw new Error("Answer doesn't exist");
    return findAnswer;
  }

  public async createAnswer(answerData: CreateAnswerDto): Promise<Answer> {
    return this.answerRepository.create(answerData);
  }

  public async updateAnswer(answerId: string, answerData: CreateAnswerDto): Promise<Answer> {
    return this.answerRepository.update(answerId, answerData);
  }

  public async deleteAnswer(answerId: string): Promise<Answer> {
    return this.answerRepository.delete(answerId);
  }

  public async findAnswersByQuestionId(questionId: string): Promise<Answer[]> {
    return this.answerRepository.findByQuestionId(questionId);
  }
}

export default AnswerService;
