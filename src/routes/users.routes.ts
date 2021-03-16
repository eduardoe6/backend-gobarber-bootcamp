import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  const {id, createdAt, updatedAt} = user;

  const userResponse = {id, name, email, createdAt, updatedAt};

  return response.json(userResponse);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
);

export default usersRouter;
