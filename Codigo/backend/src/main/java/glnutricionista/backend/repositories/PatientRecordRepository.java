package glnutricionista.backend.repositories;

import glnutricionista.backend.models.Patient;
import glnutricionista.backend.models.PatientRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface PatientRecordRepository extends JpaRepository<PatientRecord, Long> {
  @Query("SELECT pr FROM PatientRecord pr WHERE pr.patient.id = :patientId")
  List<PatientRecord> findByPatient(Long patientId);
}
