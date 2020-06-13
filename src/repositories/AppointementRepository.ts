import { isEqual } from 'date-fns';
import Appointment from '../models/Appointement';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null; // Tipo um else
  }

  //  public create(data: CreateAppointmentDTO): Appointment {
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment: Appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentRepository;
