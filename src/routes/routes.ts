import { Router } from 'express';

const routes = Router();

routes.get('/', (req, resp) => resp.json({ message: 'Hello World!' }));

export default routes;
