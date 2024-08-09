import request from 'supertest';
import App from '../app';
import AuthRoute from '../routes/auth.route';
import IndexRoute from '../routes/index.route';
import UsersRoute from '../routes/users.route';
import AnswersRoute from '../routes/answers.route';
import EmployeesRoute from '../routes/employee.route';
import EvaluationsRoute from '../routes/evaluations.route';
import QuestionsRoute from '../routes/questions.route';
import ReportsRoute from '../routes/reports.route';
import mongoose from 'mongoose';
import { dbConnection } from '../databases/index';
import { createTestToken } from '../utils/jwtSignin';

let token: string;

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new AnswersRoute(),
  new EmployeesRoute(),
  new EvaluationsRoute(),
  new QuestionsRoute(),
  new ReportsRoute(),
]).getServer();

beforeAll(async () => {
  await mongoose.connect(dbConnection.url, dbConnection.options as mongoose.ConnectOptions);

  const userRes = await request(app).post('/api/auth/register').send({ email: 'test@example.com', password: 'password', role: 'admin' });
  if (userRes.status !== 201 || !userRes.body.data) {
    throw new Error(`Failed to create user: ${userRes.text}`);
  }
  const user = userRes.body.data;
  token = createTestToken(user);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

const createSampleData = async () => {
  const uniqueEmail = `test${Date.now()}@example.com`;

  const userRes = await request(app)
    .post('/api/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ email: uniqueEmail, password: 'password', role: 'admin' });

  if (userRes.status !== 201 || !userRes.body.data) {
    throw new Error(`Failed to create user: ${userRes.text}`);
  }
  const userId = userRes.body.data._id;

  const employeeRes = await request(app).post('/api/employees').set('Authorization', `Bearer ${token}`).send({
    name: 'Test Employee',
    position: 'Developer',
    department: 'IT',
    manager: userId,
  });

  if (employeeRes.status !== 201 || !employeeRes.body.data) {
    throw new Error(`Failed to create employee: ${employeeRes.text}`);
  }
  const employeeId = employeeRes.body.data._id;

  const evaluationRes = await request(app).post('/api/evaluations').set('Authorization', `Bearer ${token}`).send({
    employee: employeeId,
    period: '2023-Q1',
    status: 'Completed',
    type: 'Now',
    evaluator: userId,
  });

  if (evaluationRes.status !== 201 || !evaluationRes.body.data) {
    throw new Error(`Failed to create evaluation: ${evaluationRes.text}`);
  }

  return {
    user: userRes.body.data,
    employee: employeeRes.body.data,
    evaluation: evaluationRes.body.data,
  };
};

describe('Integration Test', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'test2@example.com', password: 'password', role: 'admin' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('email', 'test2@example.com');
  });

  it('should get a user by id', async () => {
    const createUserRes = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'test3@example.com', password: 'password', role: 'employee' });
    const userId = createUserRes.body.data._id;

    const res = await request(app).get(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('email', 'test3@example.com');
  });

  it('should create a new evaluation', async () => {
    const createUserRes = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'evaluator@example.com', password: 'password', role: 'employee' });
    const evaluatorId = createUserRes.body.data._id;

    const createEmployeeRes = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Employee 1', position: 'Developer', department: 'Engineering', manager: evaluatorId });
    const employeeId = createEmployeeRes.body.data._id;

    const res = await request(app)
      .post('/api/evaluations')
      .set('Authorization', `Bearer ${token}`)
      .send({ employee: employeeId, evaluator: evaluatorId, period: '2023-Q1', status: 'Active', type: 'Now' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('employee', employeeId);
    expect(res.body.data).toHaveProperty('evaluator', evaluatorId);
  });

  it('should get evaluations', async () => {
    const res = await request(app).get('/api/evaluations').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toBeInstanceOf(Array);
  });

  describe('Integration Test for /evaluations/id/submit', () => {
    let testData;

    beforeEach(async () => {
      testData = await createSampleData();
    });

    it('should submit an existing evaluation (positive scenario)', async () => {
      const { evaluation } = testData;

      const submitRes = await request(app).put(`/api/evaluations/${evaluation._id}/submit`).set('Authorization', `Bearer ${token}`);
      expect(submitRes.statusCode).toEqual(200);

      const getEvaluationRes = await request(app).get(`/api/evaluations/${evaluation._id}`).set('Authorization', `Bearer ${token}`);
      expect(getEvaluationRes.statusCode).toEqual(200);
      expect(getEvaluationRes.body.data).toHaveProperty('status');
    });

    it('should return an error for non-existent evaluation (negative scenario)', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const submitRes = await request(app).put(`/api/evaluations/${invalidId}/submit`).set('Authorization', `Bearer ${token}`);
      expect(submitRes.statusCode).toEqual(409);
    });
  });
});
