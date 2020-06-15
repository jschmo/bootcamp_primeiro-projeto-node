import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointement';
import AppointmentsRepository from '../repositories/AppointementRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointementService {
  // private appointmentsRepository: AppointmentsRepository;
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInTheSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInTheSameDate) {
      throw Error('This appointment is already booked');
    }
    // Create appointment object
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointementService;
