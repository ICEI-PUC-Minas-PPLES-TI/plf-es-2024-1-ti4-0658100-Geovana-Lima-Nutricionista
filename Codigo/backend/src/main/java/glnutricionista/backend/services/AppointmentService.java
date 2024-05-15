package glnutricionista.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.PatientRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    public Appointment createAppointment(Appointment appointment, Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElse(null);
        appointment.setPatient(patient);
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
