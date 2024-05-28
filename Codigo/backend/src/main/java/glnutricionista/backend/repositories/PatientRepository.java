package glnutricionista.backend.repositories;

import glnutricionista.backend.models.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Page<Patient> findByNameContaining(String name, Pageable pageable);

    Patient findByEmail(String email);
}
