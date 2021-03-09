import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect e-mail or password combination');
    }

    let passwordMatched = false;
    if (password === user.password) {
      passwordMatched = true;
    }

    if (!passwordMatched) {
      throw new Error('Incorrect e-mail or password combination');
    }

    const token = sign({}, 'eb19c1c15ca9326b7e005526b7c199ed', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
