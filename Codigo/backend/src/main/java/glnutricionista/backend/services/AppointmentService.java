package glnutricionista.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.repositories.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(Appointment appointment) {
        Optional<Appointment> existingAppointment = appointmentRepository.findByDateAndHour(appointment.getDate(),
                appointment.getHour());

        if (existingAppointment.isPresent()) {
            throw new RuntimeException("Horário já ocupado por outra consulta.");
        }

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAllPatientAppointments(Long id) {
        List<Appointment> appointments = appointmentRepository.findByPatient(id);
        appointments.forEach(appointment -> {
            appointment.getRecord(); // Define o registro do paciente na consulta
        });
        return appointments;
    }

    public Appointment getAppointment(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            return appointment.get();
        } else {
            throw new IllegalArgumentException("Appointment not found");
        }
    }

    public Appointment updateAppointment(Long id, Appointment appointment) {
        appointment.setId(id);
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
