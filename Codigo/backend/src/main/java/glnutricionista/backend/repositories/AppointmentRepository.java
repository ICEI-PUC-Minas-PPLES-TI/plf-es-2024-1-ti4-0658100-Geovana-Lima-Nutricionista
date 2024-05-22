package glnutricionista.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import glnutricionista.backend.models.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  @Query("SELECT COUNT(a) FROM Appointment a WHERE a.patient.id = :patientId")
  public long countByPatientId(Long patientId);

  @Query("SELECT COALESCE(SUM(a.price), 0) FROM Appointment a WHERE a.patient.id = :patientId")
  public double sumPriceByPatientId(Long patientId);

  @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId")
  public List<Appointment> findByPatient(Long patientId);

  Optional<Appointment> findByDateAndHour(LocalDate date, LocalTime hour);
}
