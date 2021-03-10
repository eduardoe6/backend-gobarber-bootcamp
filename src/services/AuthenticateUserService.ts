import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";
import User from "../models/User";

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
      throw new AppError("Incorrect e-mail or password combination", 401);
    }

    let passwordMatched = false;
    if (password === user.password) {
      passwordMatched = true;
    }

    if (!passwordMatched) {
      throw new AppError("Incorrect e-mail or password combination", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
