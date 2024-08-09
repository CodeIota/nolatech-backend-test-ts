import { CreateEvaluationDto } from '../dtos/evaluations.dto';
import UsersRoute from '../routes/users.route';
import EvaluationsRoute from '../routes/evaluations.route';
import { dbConnection } from '../databases/index';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import { EvaluationStatus, EvaluationType } from '../interfaces/evaluations.interface';
import { createTestToken } from '../utils/jwtSignin';
import AuthRoute from '../routes/auth.route';

let token: string;

const app = new App([new UsersRoute(), new AuthRoute()]).getServer();

beforeAll(async () => {
  await mongoose.connect(dbConnection.url, dbConnection.options as mongoose.ConnectOptions);

  const uniqueEmail = `test${Date.now()}@example.com`;

  const userRes = await request(app).post('/api/auth/register').send({ email: uniqueEmail, password: 'password', role: 'admin' });
  if (userRes.status !== 201 || !userRes.body.data) {
    throw new Error(`Failed to create user: ${userRes.text}`);
  }
  const user = userRes.body.data;
  token = createTestToken(user);
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Testing Evaluations', () => {
  describe('[GET] /api/evaluations', () => {
    it('response findAll Evaluations', async () => {
      const evaluationsRoute = new EvaluationsRoute();
      const evaluationsService = evaluationsRoute.evaluationsController.evaluationService;

      jest.spyOn(evaluationsService, 'findAllEvaluations').mockReturnValue(
        Promise.resolve([
          {
            _id: 'qpwoeiruty',
            employee: new mongoose.Types.ObjectId().toString(),
            period: '2023-Q1',
            status: EvaluationStatus.Active,
            type: EvaluationType.Later,
            evaluator: new mongoose.Types.ObjectId().toString(),
          },
          {
            _id: 'alskdjfhg',
            employee: new mongoose.Types.ObjectId().toString(),
            period: '2023-Q2',
            status: EvaluationStatus.Completed,
            type: EvaluationType.Later,
            evaluator: new mongoose.Types.ObjectId().toString(),
          },
          {
            _id: 'zmxncbv',
            employee: new mongoose.Types.ObjectId().toString(),
            period: '2023-Q3',
            status: EvaluationStatus.Inactive,
            type: EvaluationType.Later,
            evaluator: new mongoose.Types.ObjectId().toString(),
          },
        ]),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([evaluationsRoute]);

      return request(app.getServer()).get(`${evaluationsRoute.path}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[GET] /api/evaluations/:id', () => {
    it('response findOne Evaluation', async () => {
      const evaluationId = 'qpwoeiruty';

      const evaluationsRoute = new EvaluationsRoute();
      const evaluationsService = evaluationsRoute.evaluationsController.evaluationService;

      jest.spyOn(evaluationsService, 'findEvaluationById').mockReturnValue(
        Promise.resolve({
          _id: 'qpwoeiruty',
          employee: new mongoose.Types.ObjectId().toString(),
          period: '2023-Q1',
          status: EvaluationStatus.Active,
          type: EvaluationType.Later,
          evaluator: new mongoose.Types.ObjectId().toString(),
        }),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([evaluationsRoute]);

      return request(app.getServer()).get(`${evaluationsRoute.path}/${evaluationId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[POST] /api/evaluations', () => {
    it('response Create Evaluation', async () => {
      const evaluationData: CreateEvaluationDto = {
        employee: new mongoose.Types.ObjectId().toString(),
        period: '2023-Q1',
        status: EvaluationStatus.Completed,
        type: EvaluationType.Later,
        evaluator: new mongoose.Types.ObjectId().toString(),
      };

      const evaluationsRoute = new EvaluationsRoute();
      const evaluationsService = evaluationsRoute.evaluationsController.evaluationService;

      jest.spyOn(evaluationsService, 'createEvaluation').mockReturnValue(
        Promise.resolve({
          _id: '60706478aad6c9ad19a31c84',
          employee: evaluationData.employee,
          period: evaluationData.period,
          status: evaluationData.status,
          type: evaluationData.type,
          evaluator: evaluationData.evaluator,
        }),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([evaluationsRoute]);

      return request(app.getServer()).post(`${evaluationsRoute.path}/`).set('Authorization', `Bearer ${token}`).send(evaluationData).expect(201);
    });
  });

  describe('[PUT] /api/evaluations/:id', () => {
    it('response Update Evaluation', async () => {
      const evaluationId = '60706478aad6c9ad19a31c84';
      const evaluationData: CreateEvaluationDto = {
        employee: new mongoose.Types.ObjectId().toString(),
        period: '2023-Q1',
        status: EvaluationStatus.Completed,
        type: EvaluationType.Later,
        evaluator: new mongoose.Types.ObjectId().toString(),
      };

      const evaluationsRoute = new EvaluationsRoute();
      const evaluationsService = evaluationsRoute.evaluationsController.evaluationService;

      jest.spyOn(evaluationsService, 'updateEvaluation').mockReturnValue(
        Promise.resolve({
          _id: evaluationId,
          employee: evaluationData.employee,
          period: evaluationData.period,
          status: evaluationData.status,
          type: evaluationData.type,
          evaluator: evaluationData.evaluator,
        }),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([evaluationsRoute]);

      return request(app.getServer())
        .put(`${evaluationsRoute.path}/${evaluationId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(evaluationData)
        .expect(200);
    });
  });

  describe('[POST] /api/evaluations/:id/submit', () => {
    it('response Submit Evaluation', async () => {
      const evaluationId = '60706478aad6c9ad19a31c84';

      const evaluationsRoute = new EvaluationsRoute();
      const evaluationsService = evaluationsRoute.evaluationsController.evaluationService;

      jest.spyOn(evaluationsService, 'submitEvaluation').mockReturnValue(
        Promise.resolve({
          _id: evaluationId,
          employee: new mongoose.Types.ObjectId().toString(),
          period: '2023-Q1',
          status: EvaluationStatus.Active,
          type: EvaluationType.Later,
          evaluator: new mongoose.Types.ObjectId().toString(),
        }),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([evaluationsRoute]);

      return request(app.getServer()).put(`${evaluationsRoute.path}/${evaluationId}/submit`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });
});
