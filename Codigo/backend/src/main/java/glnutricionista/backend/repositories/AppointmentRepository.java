package glnutricionista.backend.repositories;

import glnutricionista.backend.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import glnutricionista.backend.DTO.PatientVisitsDTO;
import glnutricionista.backend.models.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  @Query("SELECT COUNT(a) FROM Appointment a WHERE a.patient.id = :patientId")
  long countByPatientId(Long patientId);

  @Query("SELECT COALESCE(SUM(a.price), 0) FROM Appointment a WHERE a.patient.id = :patientId AND a.paid = true")
  double sumPriceByPatientId(Long patientId);

  @Query("SELECT COALESCE(SUM(a.price), 0) FROM Appointment a WHERE a.patient.id = :patientId AND a.paid = false")
  double sumPriceNotPaidByPatientId(Long patientId);

  @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId")
  List<Appointment> findByPatient(Long patientId);

  @Query("SELECT p.name FROM Patient p WHERE p.id = :patientId")
  String findPatientNameById(Long patientId);

  List<Appointment> findByPatientId(Long patientId);

  @Query("SELECT new glnutricionista.backend.DTO.PatientVisitsDTO(a.patient.name, COUNT(a)) " +
      "FROM Appointment a GROUP BY a.patient.name")
  List<PatientVisitsDTO> findAllPatientVisits();

  @Query("SELECT COUNT(DISTINCT a.patient) FROM Appointment a")
  Long countDistinctPatients();

  @Query("SELECT SUM(a.price) FROM Appointment a")
  Double sumTotalRevenue();

  Optional<Appointment> findByDateAndHour(LocalDate date, LocalTime hour);

  List<Appointment> findByDateBetween(LocalDate startDate, LocalDate endDate);

  @Query("SELECT a FROM Appointment a WHERE a.date >= :today AND a.status = 'MARCADO' ORDER BY a.date, a.hour ASC")
  List<Appointment> findNextThreeMarkedAppointments(@Param("today") LocalDate today, Pageable pageable);

  @Query("SELECT a FROM Appointment a WHERE a.date = :today AND a.status = 'MARCADO' ORDER BY a.hour ASC")
  List<Appointment> findTodayMarkedAppointments(@Param("today") LocalDate today);
  
  @Query("SELECT COUNT(a) FROM Appointment a WHERE MONTH(a.date) = :month AND YEAR(a.date) = :year")
    int countAppointmentsInMonth(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COUNT(DISTINCT a.patient) FROM Appointment a WHERE MONTH(a.date) = :month AND YEAR(a.date) = :year")
    Long countDistinctPatientsInMonth(@Param("month") int month, @Param("year") int year);

    @Query("SELECT SUM(a.price) FROM Appointment a WHERE MONTH(a.date) = :month AND YEAR(a.date) = :year")
    Double sumTotalRevenueInMonth(@Param("month") int month, @Param("year") int year);

  Long countByDateBetween(LocalDate startDate, LocalDate endDate);


    List<Appointment> findByDate(LocalDate date);
}
