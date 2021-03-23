import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    const { id, createdAt, updatedAt } = user;

    const userResponse = { id, name, email, createdAt, updatedAt };

    return response.json(userResponse);
  }
}
