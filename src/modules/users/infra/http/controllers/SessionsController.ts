import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { userData, token } = await authenticateUser.execute({
      email,
      password,
    });

    const { id, name, createdAt, updatedAt } = userData;

    const user = { id, name, email, createdAt, updatedAt };

    return response.json({ user, token });
  }
}
