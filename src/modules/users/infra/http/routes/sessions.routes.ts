import AuthenticateUserService from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { userData, token } = await authenticateUser.execute({
    email,
    password,
  });

  const { id, name, createdAt, updatedAt } = userData;

  const user = { id, name, email, createdAt, updatedAt };

  return response.json({ user, token });
});

export default sessionsRouter;
