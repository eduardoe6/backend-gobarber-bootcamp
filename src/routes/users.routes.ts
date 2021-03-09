import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    const createUserResponse = {
      id: user.id,
      name: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return response.json(createUserResponse);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
