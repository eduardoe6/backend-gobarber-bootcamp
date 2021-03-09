import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
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

    return { user };
  }
}

export default AuthenticateUserService;
