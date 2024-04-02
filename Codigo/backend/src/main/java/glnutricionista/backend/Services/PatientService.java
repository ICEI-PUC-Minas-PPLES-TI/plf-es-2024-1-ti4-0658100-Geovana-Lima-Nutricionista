package glnutricionista.backend.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import glnutricionista.backend.Models.Address;
import glnutricionista.backend.Models.Patient;
import glnutricionista.backend.Repositories.AddressRepository;
import glnutricionista.backend.Repositories.PatientRepository;

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

  public List<Patient> getAllPatients() {
    return patientRepository.findAll();
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
