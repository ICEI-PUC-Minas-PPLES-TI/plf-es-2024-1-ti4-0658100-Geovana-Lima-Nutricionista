package glnutricionista.backend.services;

import glnutricionista.backend.models.PatientRecord;
import glnutricionista.backend.repositories.PatientRecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientRecordService {

    @Autowired
    private PatientRecordRepository patientRecordRepository;

    public PatientRecord createPatientRecord(PatientRecord patientRecord) {
        return patientRecordRepository.save(patientRecord);
    }

    public List<PatientRecord> getAllPatientRecords() {
        return patientRecordRepository.findAll();
    }

    public PatientRecord getPatientRecord(Long id) {
        return patientRecordRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Patient Record Id:" + id));
    }
    public PatientRecord getPatientRecordByPatient(Long id) {
        return patientRecordRepository.findByPatientId(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Patient Id:" + id));
    }

    public PatientRecord updatePatientRecord(Long id, PatientRecord updatedPatientRecord) {
        PatientRecord patientRecord = patientRecordRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Patient Record Id:" + id));

        patientRecord.setWeight(updatedPatientRecord.getWeight());
        patientRecord.setHeight(updatedPatientRecord.getHeight());
        patientRecord.setPhysicalActivities(updatedPatientRecord.getPhysicalActivities());
        patientRecord.setImc(updatedPatientRecord.getImc());
        patientRecord.setWaist(updatedPatientRecord.getWaist());
        patientRecord.setBust(updatedPatientRecord.getBust());
        patientRecord.setObservations(updatedPatientRecord.getObservations());

        return patientRecordRepository.save(patientRecord);
    }

    public void deletePatientRecord(Long id) {
        patientRecordRepository.deleteById(id);
    }
}
