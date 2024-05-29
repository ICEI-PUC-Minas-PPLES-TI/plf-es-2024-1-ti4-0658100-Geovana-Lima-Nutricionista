package glnutricionista.backend.services;

import glnutricionista.backend.DTO.AppointmentDTO;
import glnutricionista.backend.DTO.PatientVisitsDTO;
import glnutricionista.backend.DTO.SummaryDTO;
import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    public Appointment createAppointment(Appointment appointment, Long patientId) {
        Optional<Appointment> existingAppointment = appointmentRepository.findByDateAndHour(appointment.getDate(),
                appointment.getHour());

        if (existingAppointment.isPresent()) {
            throw new RuntimeException("Horário já ocupado por outra consulta.");
        }

        Patient patient = patientRepository.findById(patientId).orElse(null);
        appointment.setPatient(patient);

        return appointmentRepository.save(appointment);
    }

    public List<PatientVisitsDTO> getAllPatientsWithVisits() {
        return appointmentRepository.findAllPatientVisits();
    }

    public List<Appointment> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();

        Collections.sort(appointments, Comparator.comparing(Appointment::getDate)
                .thenComparing(Appointment::getHour));

        appointments.forEach(appointment -> {
            appointment.getRecord();
            appointment.getPatient();
        });

        return appointments;
    }

    public List<Appointment> getAllPatientAppointments(Long id) {
        List<Appointment> appointments = appointmentRepository.findByPatient(id);

        Collections.sort(appointments, Comparator.comparing(Appointment::getDate)
                .thenComparing(Appointment::getHour).reversed());

        appointments.forEach(appointment -> {
            appointment.getRecord();
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
        Appointment oldAppointment = appointmentRepository.findById(id).orElseThrow();
        appointment.setId(id);
        appointment.setPatient(oldAppointment.getPatient());
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public Long countAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.countByPatientId(patientId);
    }

    public String getPatientNameById(Long patientId) {
        return appointmentRepository.findPatientNameById(patientId);
    }

    public SummaryDTO getSummary() {
        int appointments = appointmentRepository.findAll().size();
        Long totalPatients = appointmentRepository.countDistinctPatients();
        Double totalRevenue = appointmentRepository.sumTotalRevenue();
        return new SummaryDTO(appointments, totalPatients, totalRevenue);
    }
}
