import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  userData: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const userData = await usersRepository.findOne({ where: { email } });

    if (!userData) {
      throw new AppError('Incorrect e-mail or password combination', 401);
    }

    let passwordMatched = false;
    if (password === userData.password) {
      passwordMatched = true;
    }

    if (!passwordMatched) {
      throw new AppError('Incorrect e-mail or password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userData.id,
      expiresIn,
    });

    return { userData, token };
  }
}

export default AuthenticateUserService;