package glnutricionista.backend.DTO;

import glnutricionista.backend.Models.Patient;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PatientDTO {
  @NotBlank(message = "The name is required.")
  private String name;

  @NotBlank(message = "The email is required.")
  @Email(message = "Invalid email format.")
  private String email;

  @NotBlank(message = "The birth date is required.")
  private String birthDate;

  @NotBlank(message = "The occupation is required.")
  private String occupation;

  @NotBlank(message = "The goal is required.")
  private String goal;

  @Valid
  @NotNull(message = "The address is required.")
  private AddressDTO address;

  public Patient toPatient() {
    Patient patient = new Patient();
    patient.setName(name);
    patient.setEmail(email);
    patient.setBirthDate(birthDate);
    patient.setOccupation(occupation);
    patient.setGoal(goal);
    patient.setAddress(address.toAddress());
    return patient;
  }
}
