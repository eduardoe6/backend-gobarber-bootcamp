import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Router } from 'express';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { userData, token } = await authenticateUser.execute({
    email,
    password,
  });

  const { id, name, createdAt, updatedAt } = userData;

  const user = { id, name, email, createdAt, updatedAt };

  return response.json({ user, token });
});

export default sessionsRouter;
