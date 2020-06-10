import { Router } from 'express';

const routes = Router();

routes.get('/', (req, resp) => resp.json({ message: 'Hello World!' }));
routes.post('/users', (req, res) => {
  const { name, email } = req.body;

  const user = { name, email };
  return res.json(user);
});

export default routes;
