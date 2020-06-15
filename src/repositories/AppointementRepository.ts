import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointement';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // await => async => Promise

    //    const findAppointment = this.appointments.find(appointment =>
    //      isEqual(date, appointment.date),
    //    );
    const findAppointment = await this.findOne({
      // where: { date : date},
      where: { date },
    });
    return findAppointment || null; // Tipo um else
  }
}

export default AppointmentRepository;
