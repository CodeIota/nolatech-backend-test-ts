import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { dbConnection } from '@databases';
import User from '@models/users.model';
import Employee from '@models/employee.model';
import Question from '@models/question.model';
import Answer from '@models/answer.model';
import Evaluation from '@models/evaluation.model';
import { User as UserInterface } from '@interfaces/users.interface';
import { Employee as EmployeeInterface } from '@interfaces/employees.interface';
import { Question as QuestionInterface } from '@interfaces/questions.interface';
import { Answer as AnswerInterface } from '@interfaces/answers.interface';
import { Evaluation as EvaluationInterface, EvaluationType, EvaluationStatus } from '@interfaces/evaluations.interface';

const init = async () => {
  try {
    await mongoose.connect(dbConnection.url, dbConnection.options as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');

    const users: Partial<UserInterface>[] = [
      { email: 'admin@example.com', password: bcrypt.hashSync('password', 10), role: 'admin' },
      { email: 'manager@example.com', password: bcrypt.hashSync('password', 10), role: 'manager' },
      { email: 'employee1@example.com', password: bcrypt.hashSync('password', 10), role: 'employee' },
      { email: 'employee2@example.com', password: bcrypt.hashSync('password', 10), role: 'employee' },
    ];
    const insertedUsers = await User.insertMany(users);

    const employees: Partial<EmployeeInterface>[] = [];
    for (let i = 1; i <= 10; i++) {
      employees.push({
        name: `Employee ${i}`,
        position: `Position ${i}`,
        department: `Department ${i}`,
        manager: insertedUsers[1]._id.toString(),
      });
    }
    const insertedEmployees = await Employee.insertMany(employees);

    const evaluations: Partial<EvaluationInterface>[] = [];
    insertedEmployees.forEach(employee => {
      for (let j = 1; j <= 6; j++) {
        evaluations.push({
          employee: employee._id.toString(),
          period: `Period ${j}`,
          status: EvaluationStatus.Active,
          type: EvaluationType.Now,
          evaluator: insertedUsers[1]._id.toString(),
        });
      }
    });
    const insertedEvaluations = await Evaluation.insertMany(evaluations);

    const questions: Partial<QuestionInterface>[] = [];
    insertedEvaluations.forEach(evaluation => {
      for (let j = 1; j <= 4; j++) {
        questions.push({
          text: `Question ${j} for evaluation ${evaluation._id}`,
          evaluation: evaluation._id.toString(),
        });
      }
    });
    const insertedQuestions = await Question.insertMany(questions);

    const answers: Partial<AnswerInterface>[] = [];
    insertedQuestions.forEach(question => {
      for (let k = 1; k <= 2; k++) {
        answers.push({
          evaluation: question.evaluation,
          question: question._id.toString(),
          response: `Response ${k} for ${question.text}`,
        });
      }
    });
    await Answer.insertMany(answers);

    console.log('Database initialized with sample data');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database: ', error);
    process.exit(1);
  }
};

init();
