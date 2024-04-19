package glnutricionista.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import glnutricionista.backend.DTO.PatientDTO;
import glnutricionista.backend.models.Patient;
import jakarta.validation.Valid;
import glnutricionista.backend.services.PatientService;

@RestController
@RequestMapping(value = "/patient")
public class PatientController {

  @Autowired
  private PatientService patientService;

  @PostMapping()
  public ResponseEntity<Patient> createPatient(@RequestBody @Valid PatientDTO patientDTO) {
    try {
      Patient createdPatient = patientService.createPatient(patientDTO.toPatient());
      return ResponseEntity.status(HttpStatus.CREATED).body(createdPatient);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid data provided", e);
    }
  }

  @GetMapping()
  public ResponseEntity<List<Patient>> getAllPatients(@RequestParam int page, @RequestParam int per_page, @RequestParam(required = false) String patient_name) {
    if (page < 1 || per_page < 1) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid page or per_page parameter");
    }

    List<Patient> patients = patientService.getAllPatients(page, per_page, patient_name);
    return ResponseEntity.ok(patients);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Patient> getPatient(@PathVariable Long id) {
    Patient patient = patientService.getPatient(id);
    if (patient == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found");
    }
    return ResponseEntity.ok(patient);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody @Valid PatientDTO patientDTO) {
    try {
      Patient updatedPatient = patientService.updatePatient(id, patientDTO.toPatient());
      return ResponseEntity.ok(updatedPatient);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid data provided", e);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
    patientService.deletePatient(id);
    return ResponseEntity.noContent().build();
  }
}
