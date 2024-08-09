import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/index';

const _id: string = process.argv[2];

if (!_id) {
  console.error('Usage: npm run generate-token <email> <password> <role>');
  process.exit(1);
}

const dataStoredInToken = {
  _id: _id,
};

const token = sign(dataStoredInToken, SECRET_KEY, { expiresIn: '1h' });

console.log('Generated Token:', token);
