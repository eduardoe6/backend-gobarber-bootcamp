import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
