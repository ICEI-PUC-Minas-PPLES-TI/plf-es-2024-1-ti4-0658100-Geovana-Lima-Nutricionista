package glnutricionista.backend.repositories;

import glnutricionista.backend.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.patient.id = :patientId")
    long countByPatientId(Long patientId);

    @Query("SELECT COALESCE(SUM(a.price), 0) FROM Appointment a WHERE a.patient.id = :patientId AND a.paid = true")
    double sumPriceByPatientId(Long patientId);

    @Query("SELECT COALESCE(SUM(a.price), 0) FROM Appointment a WHERE a.patient.id = :patientId AND a.paid = false")
    double sumPriceNotPaidByPatientId(Long patientId);

    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId")
    List<Appointment> findByPatient(Long patientId);

    Optional<Appointment> findByDateAndHour(LocalDate date, LocalTime hour);

    List<Appointment> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Appointment> findByDate(LocalDate date);
}
