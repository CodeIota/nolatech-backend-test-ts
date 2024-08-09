import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const registerUserData = await this.authService.signup(userData);
      res.status(201).json({ data: registerUserData, message: 'registered' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'logged in' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
