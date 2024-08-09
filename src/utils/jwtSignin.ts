import { sign } from 'jsonwebtoken';
import { User } from '@interfaces/users.interface';
import { SECRET_KEY } from '@config';

export const createTestToken = (user: User): string => {
  const dataStoredInToken = { _id: user._id };
  return sign(dataStoredInToken, SECRET_KEY, { expiresIn: '1h' });
};
