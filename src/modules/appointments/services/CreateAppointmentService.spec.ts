import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 3, 24, 11);

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '123123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
