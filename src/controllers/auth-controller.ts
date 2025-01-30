import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user-model.js';
import { InternalServerError } from '../errors/custom-errors/internal-server-error.js';

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  User.create({
    username,
    email,
    passwordHash,
  })
    .then((user) => {
      res.status(201).json(user.serialize());
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
