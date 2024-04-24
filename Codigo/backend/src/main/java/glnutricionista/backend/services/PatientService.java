package glnutricionista.backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import glnutricionista.backend.models.Address;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.repositories.AddressRepository;
import glnutricionista.backend.repositories.PatientRepository;

@Service
public class PatientService {

  @Autowired
  private PatientRepository patientRepository;

  @Autowired
  private AddressRepository addressRepository;

  public Patient createPatient(Patient patient) {

    Address address = patient.getAddress();
    patient.setAddress(addressRepository.save(address));

    return patientRepository.save(patient);
  }

  public Patient getPatient(Long id) {
    return patientRepository.getReferenceById(id);
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
}
