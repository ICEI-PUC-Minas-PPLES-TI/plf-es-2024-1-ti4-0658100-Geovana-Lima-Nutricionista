package glnutricionista.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import glnutricionista.backend.Models.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
  
}
