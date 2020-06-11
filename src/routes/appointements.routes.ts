import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInTheSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInTheSameDate) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }
  const appointment: Appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };
  appointments.push(appointment);
  return res.json(appointment);
});

export default appointmentsRouter;
