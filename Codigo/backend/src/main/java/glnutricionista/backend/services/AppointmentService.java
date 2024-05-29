package glnutricionista.backend.services;

import glnutricionista.backend.DTO.AppointmentDTO;
import glnutricionista.backend.DTO.PatientVisitsDTO;
import glnutricionista.backend.DTO.SummaryDTO;
import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

     public Long countAppointmentsByYear(int year) {
        LocalDate startDate = Year.of(year).atDay(1);
        LocalDate endDate = Year.of(year).atDay(startDate.lengthOfYear());
        return appointmentRepository.countByDateBetween(startDate, endDate);
    }

    public List<Map.Entry<String, Long>> countAppointmentsByMonth(int year) {
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        List<Appointment> appointments = appointmentRepository.findByDateBetween(startDate, endDate);

        // Agrupar e contar consultas por mês
        Map<String, Long> monthlyCounts = appointments.stream()
                .collect(Collectors.groupingBy(
                        appt -> YearMonth.from(appt.getDate()).toString(),
                        Collectors.counting()
                ));

        // Garantir que todos os meses estão presentes mesmo que com 0 consultas
        Map<String, Long> completeMonthlyCounts = new HashMap<>();
        for (int month = 1; month <= 12; month++) {
            YearMonth yearMonth = YearMonth.of(year, month);
            completeMonthlyCounts.put(yearMonth.toString(), monthlyCounts.getOrDefault(yearMonth.toString(), 0L));
        }

        
        return completeMonthlyCounts.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toList());
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

    public List<Appointment> getAllPatientAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public Appointment getAppointment(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment oldAppointment = appointmentRepository.findById(id).orElseThrow();
        appointment.setId(id);
        appointment.setPatient(oldAppointment.getPatient());
        return appointmentRepository.save(appointment);
    }

   public List<Appointment> getNextThreeMarkedAppointments() {
        LocalDate today = LocalDate.now();
        Pageable topThree = PageRequest.of(0, 3);
        return appointmentRepository.findNextThreeMarkedAppointments(today, topThree);
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
