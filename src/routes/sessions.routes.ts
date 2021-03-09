import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    const sessionResponse = {
      id: user.id,
      token: token,
      name: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return response.json(sessionResponse);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
