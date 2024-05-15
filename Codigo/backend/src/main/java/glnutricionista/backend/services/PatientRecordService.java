package glnutricionista.backend.services;

import glnutricionista.backend.DTO.PatientRecordDTO;
import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.models.PatientRecord;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.PatientRecordRepository;
import glnutricionista.backend.repositories.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientRecordService {

    @Autowired
    private PatientRecordRepository patientRecordRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public PatientRecord createPatientRecord(PatientRecord patientRecord, Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);

        if (appointment == null) {
            throw new IllegalArgumentException("Invalid Appointment Id: " + appointmentId);
        }

        Patient patient = appointment.getPatient();

        if (patient == null) {
            throw new IllegalArgumentException("Invalid Patient Associated to Appointment: " + appointment.getId());
        }

        patientRecord.setPatient(patient);
        patientRecord.setAppointment(appointment);

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
