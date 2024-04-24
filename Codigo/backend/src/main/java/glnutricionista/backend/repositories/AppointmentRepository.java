package glnutricionista.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import glnutricionista.backend.models.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  @Query("SELECT COUNT(a) FROM Appointment a WHERE a.patientId = :patientId")
  long countByPatientId(Long patientId);

  @Query("SELECT COALESCE(SUM(a.price), 0) FROM Appointment a WHERE a.patientId = :patientId")
  double sumPriceByPatientId(Long patientId);

  @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId")
  List<Appointment> findByPatient(Long patientId);
}
