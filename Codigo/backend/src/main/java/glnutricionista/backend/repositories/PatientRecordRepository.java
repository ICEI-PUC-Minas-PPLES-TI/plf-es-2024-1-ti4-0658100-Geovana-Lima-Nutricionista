package glnutricionista.backend.repositories;

import glnutricionista.backend.models.PatientRecord;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRecordRepository extends JpaRepository<PatientRecord, Long> {

    Optional<PatientRecord> findByPatientId(Long id);
}
