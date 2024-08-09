import { CreateUserDto } from '../dtos/users.dto';
import UsersRoute from '../routes/users.route';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { dbConnection } from '../databases/index';
import request from 'supertest';
import App from '../app';
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

describe('Testing Users', () => {
  describe('[GET] /api/users', () => {
    it('response findAll Users', async () => {
      const usersRoute = new UsersRoute();
      const usersService = usersRoute.usersController.userService;

      jest.spyOn(usersService, 'findAllUser').mockReturnValue(
        Promise.resolve([
          {
            _id: 'qpwoeiruty',
            email: 'a@email.com',
            password: await bcrypt.hash('q1w2e3r4!', 10),
            role: 'admin',
          },
          {
            _id: 'alskdjfhg',
            email: 'b@email.com',
            password: await bcrypt.hash('a1s2d3f4!', 10),
            role: 'employee',
          },
          {
            _id: 'zmxncbv',
            email: 'c@email.com',
            password: await bcrypt.hash('z1x2c3v4!', 10),
            role: 'admin',
          },
        ]),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);

      return request(app.getServer()).get(`${usersRoute.path}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[GET] /api/users/:id', () => {
    it('response findOne User', async () => {
      const userId = 'qpwoeiruty';

      const usersRoute = new UsersRoute();
      const usersService = usersRoute.usersController.userService;

      jest.spyOn(usersService, 'findUserById').mockReturnValue(
        Promise.resolve({
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
          role: 'admin',
        }),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);

      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[POST] /api/users', () => {
    it('response Create User', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
        role: 'employee',
      };

      const usersRoute = new UsersRoute();
      const usersService = usersRoute.usersController.userService;

      jest.spyOn(usersService, 'createUser').mockReturnValue(
        Promise.resolve({
          _id: '60706478aad6c9ad19a31c84',
          email: userData.email,
          password: await bcrypt.hash(userData.password, 10),
          role: userData.role,
        }),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}/`).send(userData).set('Authorization', `Bearer ${token}`).expect(201);
    });
  });

  describe('[PUT] /api/users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
        role: 'manager',
      };

      const usersRoute = new UsersRoute();
      const usersService = usersRoute.usersController.userService;

      jest.spyOn(usersService, 'updateUser').mockReturnValue(
        Promise.resolve({
          _id: userId,
          email: userData.email,
          password: await bcrypt.hash(userData.password, 10),
          role: userData.role,
        }),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[DELETE] /api/users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const usersRoute = new UsersRoute();
      const usersService = usersRoute.usersController.userService;

      jest.spyOn(usersService, 'deleteUser').mockReturnValue(
        Promise.resolve({
          _id: '60706478aad6c9ad19a31c84',
          email: 'test@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
          role: 'admin',
        }),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });
});
