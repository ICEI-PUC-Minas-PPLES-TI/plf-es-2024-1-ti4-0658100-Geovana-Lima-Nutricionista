package glnutricionista.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import glnutricionista.backend.DTO.PatientDTO;
import glnutricionista.backend.Models.Patient;
import jakarta.validation.Valid;
import glnutricionista.backend.Services.PatientService;

@RestController
@RequestMapping(value = "/patient")
public class PatientController {

  @Autowired
  private PatientService patientService;

  @PostMapping()
  public Patient createPatient(@RequestBody @Valid PatientDTO patientDTO) {
    return patientService.createPatient(patientDTO.toPatient());
  }

  @GetMapping()
  public List<Patient> getAllPatients() {
    return patientService.getAllPatients();
  }

  @GetMapping("/{id}")
  public Patient getPatient(@PathVariable Long id) {
    return patientService.getPatient(id);
  }

  @PutMapping("/{id}")
  public Patient updatePatient(@PathVariable Long id, @RequestBody @Valid PatientDTO patientDTO) {
    return patientService.updatePatient(id, patientDTO.toPatient());
  }

  @DeleteMapping("/{id}")
  public void deletePatient(@PathVariable Long id) {
    patientService.deletePatient(id);
  }
}
