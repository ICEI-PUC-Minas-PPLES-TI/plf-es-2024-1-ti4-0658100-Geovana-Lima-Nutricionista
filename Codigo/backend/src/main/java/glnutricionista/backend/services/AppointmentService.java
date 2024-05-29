package glnutricionista.backend.services;

import glnutricionista.backend.DTO.AppointmentDTO;
import glnutricionista.backend.DTO.PatientVisitsDTO;
import glnutricionista.backend.DTO.SummaryDTO;
import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<PatientVisitsDTO> getAllPatientsWithVisits() {
        return appointmentRepository.findAllPatientVisits();
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAllPatientAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public Appointment getAppointment(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public Appointment updateAppointment(Long id, Appointment appointment) {
        appointment.setId(id);
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
