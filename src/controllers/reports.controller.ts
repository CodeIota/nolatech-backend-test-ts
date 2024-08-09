import { NextFunction, Request, Response } from 'express';
import EvaluationService from '@services/evaluations.service';
import EmployeeService from '@services/employees.service';
import QuestionService from '@services/questions.service';
import AnswerService from '@services/answers.service';

class ReportsController {
  public evaluationService = new EvaluationService();
  public employeeService = new EmployeeService();
  public questionService = new QuestionService();
  public answerService = new AnswerService();

  public getEmployeeReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.id;
      const employeeEvaluations = await this.evaluationService.findEvaluationsByEmployeeId(employeeId);

      const detailedReport = await Promise.all(
        employeeEvaluations.map(async evaluation => {
          const questions = await this.questionService.findQuestionsByEvaluationId(evaluation._id);
          const detailedQuestions = await Promise.all(
            questions.map(async question => {
              const answers = await this.answerService.findAnswersByQuestionId(question._id);
              return {
                question,
                answers,
              };
            }),
          );
          return {
            evaluation,
            questions: detailedQuestions,
          };
        }),
      );

      res.status(200).json({ data: detailedReport, message: 'employeeReport' });
    } catch (error) {
      next(error);
    }
  };

  public getDepartmentReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentId: string = req.params.id;
      const departmentEmployees = await this.employeeService.findEmployeesByDepartmentId(departmentId);

      const detailedReport = await Promise.all(
        departmentEmployees.map(async employee => {
          const employeeEvaluations = await this.evaluationService.findEvaluationsByEmployeeId(employee._id);
          const detailedEvaluations = await Promise.all(
            employeeEvaluations.map(async evaluation => {
              const questions = await this.questionService.findQuestionsByEvaluationId(evaluation._id);
              const detailedQuestions = await Promise.all(
                questions.map(async question => {
                  const answers = await this.answerService.findAnswersByQuestionId(question._id);
                  return {
                    question,
                    answers,
                  };
                }),
              );
              return {
                evaluation,
                questions: detailedQuestions,
              };
            }),
          );
          return {
            employee,
            evaluations: detailedEvaluations,
          };
        }),
      );

      res.status(200).json({ data: detailedReport, message: 'departmentReport' });
    } catch (error) {
      next(error);
    }
  };
}

export default ReportsController;
