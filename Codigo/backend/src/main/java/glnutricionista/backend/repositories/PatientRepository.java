package glnutricionista.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import glnutricionista.backend.models.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
  
}
