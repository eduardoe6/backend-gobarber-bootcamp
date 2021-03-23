import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { userData, token } = await authenticateUser.execute({
    email,
    password,
  });

  const { id, name, createdAt, updatedAt } = userData;

  const user = { id, name, email, createdAt, updatedAt };

  return response.json({ user, token });
});

export default sessionsRouter;
