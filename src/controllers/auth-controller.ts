import bcrypt from 'bcrypt';
import User from '../models/user-model.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';

const register = async (username: string, email: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);

  User.create({
    username,
    email,
    passwordHash,
  })
    .then((user) => {
      return user.serialize;
    })
    .catch((error) => {
      throw new InternalServerError(error);
    });
};

const login = () => {
  console.log('Login');
};

const verify = () => {
  console.log('Verify');
};

const logout = () => {
  console.log('Logout');
};

export { register, login, verify, logout };
