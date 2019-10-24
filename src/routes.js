import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
/**
 * POST: http://localhost:3333/sessions
 * Body:
 * {"email": "admin@gympoint.com", "password" : "123456"}
 *
 *
 */

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
/**
 * POST: http://localhost:3333/students
 * Body:
 * {
	"name" : "Nome",
	"email": "a@a.com",
	"idade": 15,
	"peso": 75.5,
	"altura": 1.80
}
*/

routes.put('/students/:studentId', StudentController.update);

export default routes;
