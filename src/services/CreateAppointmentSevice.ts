import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointement';
import AppointmentsRepository from '../repositories/AppointementRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointementService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInTheSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInTheSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointementService;
