package glnutricionista.backend.services;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import glnutricionista.backend.models.Address;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.models.PatientRecord;
import glnutricionista.backend.repositories.AddressRepository;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.PatientRepository;

@Service
public class PatientService {

  @Autowired
  private PatientRepository patientRepository;

  @Autowired
  private AddressRepository addressRepository;

  @Autowired
  private AppointmentRepository appointmentRepository;

  public Patient createPatient(Patient patient) {
    Address address = patient.getAddress();
    patient.setAddress(addressRepository.save(address));

    return patientRepository.save(patient);
  }

  public Patient getPatient(Long id) {
    Patient patient = patientRepository.findById(id).orElse(null);
    if (patient != null) {
      calculateAndSetPatientAge(patient);
      patient.getAddress();
      if (patient.getRecords() != null) {
        Collections.sort(patient.getRecords(),
            Comparator.comparing((PatientRecord record) -> record.getAppointment().getDate())
                .thenComparing(record -> record.getAppointment().getHour()));
      }

      long totalAppointments = appointmentRepository.countByPatientId(id);
      patient.setTotalAppointments(totalAppointments);
      double totalPrice = appointmentRepository.sumPriceByPatientId(id);
      patient.setTotalPrice(totalPrice);
    }
    return patient;
  }

  public List<Patient> getAllPatients(int page, int pageSize, String patientName) {
    int pageNumber = page - 1;
    PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);

    if (patientName != null && !patientName.isEmpty()) {
      Page<Patient> patientsPage = patientRepository.findByNameContaining(patientName, pageRequest);
      return patientsPage.getContent();
    }

    Page<Patient> patientsPage = patientRepository.findAll(pageRequest);

    return patientsPage.getContent();
  }

  public Patient updatePatient(Long id, Patient patient) {
    Address oldAddress = this.getPatient(id).getAddress();
    Address newAddress = patient.getAddress();
    newAddress.setId(oldAddress.getId());
    patient.setId(id);
    patient.setAddress(addressRepository.save(newAddress));
    return patientRepository.save(patient);
  }

  public void deletePatient(Long id) {
    patientRepository.deleteById(id);
  }

  public static void calculateAndSetPatientAge(Patient patient) {
    String birthDateString = patient.getBirthDate(); // Assuming this returns the birthDate as a String
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
    LocalDate birthDate = LocalDate.parse(birthDateString, formatter);

    LocalDate currentDate = LocalDate.now();
    int age = Period.between(birthDate, currentDate).getYears();

    patient.setAge(age);
  }

}
