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

  const { user, token } = await authenticateUser.execute({ email, password });
  const { } = user as SessionResponseDTO;

  const {id, name, createdAt, updatedAt} = user;

  const userResponse = {id, name, email, createdAt, updatedAt};

  return response.json({ userResponse, token });
});

export default sessionsRouter;
