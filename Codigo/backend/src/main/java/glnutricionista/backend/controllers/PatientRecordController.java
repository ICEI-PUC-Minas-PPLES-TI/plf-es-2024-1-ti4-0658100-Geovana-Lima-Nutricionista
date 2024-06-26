package glnutricionista.backend.controllers;

import glnutricionista.backend.DTO.PatientRecordDTO;
import glnutricionista.backend.models.PatientRecord;
import glnutricionista.backend.services.PatientRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/patient-records")
public class PatientRecordController {

    @Autowired
    private PatientRecordService patientRecordService;

    @PostMapping("/{appointmentId}")
    public PatientRecord createPatientRecord(@RequestBody PatientRecordDTO patientRecordDTO, @PathVariable Long appointmentId) {
        return patientRecordService.createPatientRecord(patientRecordDTO.toPatientRecord(), appointmentId);
    }

    @GetMapping()
    public List<PatientRecord> getAllPatientRecords() {
        return patientRecordService.getAllPatientRecords();
    }

    @GetMapping("/{id}")
    public PatientRecord getPatientRecord(@PathVariable Long id) {
        return patientRecordService.getPatientRecord(id);
    }

    @GetMapping("/patient/{id}")
    public PatientRecord getPatientRecordByPatient(@PathVariable Long id) {
        return patientRecordService.getPatientRecordByPatient(id);
    }

    @PutMapping("/{id}")
    public PatientRecord updatePatientRecord(@PathVariable Long id, @RequestBody PatientRecordDTO patientRecordDTO) {
        return patientRecordService.updatePatientRecord(id, patientRecordDTO.toPatientRecord());
    }

    @DeleteMapping("/{id}")
    public void deletePatientRecord(@PathVariable Long id) {
        patientRecordService.deletePatientRecord(id);
    }
}
