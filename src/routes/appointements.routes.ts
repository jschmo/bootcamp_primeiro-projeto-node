import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointementRepository';
import CreateAppointmentSevice from '../services/CreateAppointmentSevice';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentSevice();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
