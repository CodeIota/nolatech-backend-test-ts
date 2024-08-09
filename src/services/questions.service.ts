import { CreateQuestionDto } from '@dtos/questions.dto';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@interfaces/questions.interface';
import { isEmpty } from '@utils/util';
import QuestionRepository from '@repositories/questions.repository';

class QuestionService {
  private questionRepository = new QuestionRepository();

  public async findAllQuestions(): Promise<Question[]> {
    const questions: Question[] = await this.questionRepository.findAll();
    return questions;
  }

  public async findQuestionById(questionId: string): Promise<Question> {
    if (isEmpty(questionId)) throw new HttpException(400, 'QuestionId is empty');

    const findQuestion: Question = await this.questionRepository.findById(questionId);
    if (!findQuestion) throw new HttpException(409, "Question doesn't exist");

    return findQuestion;
  }

  public async createQuestion(questionData: CreateQuestionDto): Promise<Question> {
    if (isEmpty(questionData)) throw new HttpException(400, 'questionData is empty');

    const createQuestionData: Question = await this.questionRepository.create(questionData);
    return createQuestionData;
  }

  public async updateQuestion(questionId: string, questionData: CreateQuestionDto): Promise<Question> {
    if (isEmpty(questionData)) throw new HttpException(400, 'questionData is empty');

    const updateQuestionById: Question = await this.questionRepository.update(questionId, questionData);
    if (!updateQuestionById) throw new HttpException(409, "Question doesn't exist");

    return updateQuestionById;
  }

  public async deleteQuestion(questionId: string): Promise<Question> {
    const deleteQuestionById: Question = await this.questionRepository.delete(questionId);
    if (!deleteQuestionById) throw new HttpException(409, "Question doesn't exist");

    return deleteQuestionById;
  }

  public async findQuestionsByEvaluationId(evaluationId: string): Promise<Question[]> {
    return this.questionRepository.findByEvaluationId(evaluationId);
  }
}

export default QuestionService;
