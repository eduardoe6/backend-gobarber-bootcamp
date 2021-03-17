import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

interface SessionResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { userData, token } = await authenticateUser.execute({ email, password });

  const {id, name, createdAt, updatedAt} = userData;

  const user = {id, name, email, createdAt, updatedAt};

  return response.json({ user, token });
});

export default sessionsRouter;
