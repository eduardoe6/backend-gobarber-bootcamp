import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  userData: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const userData = await this.usersRepository.findByEmail(email);

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
