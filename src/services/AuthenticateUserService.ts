import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }
    const token = sign({}, 'ca366e2abb45c00ee5fe384b5e90778e', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default AuthenticateUserService;
