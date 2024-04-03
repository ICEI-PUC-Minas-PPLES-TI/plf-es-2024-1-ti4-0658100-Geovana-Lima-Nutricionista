package glnutricionista.backend.DTO;

import glnutricionista.backend.models.Address;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Pattern.Flag;
import lombok.Data;

@Data
public class AddressDTO {

  @NotBlank(message = "The country is required.")
  private String country;

  @NotBlank(message = "The city is required.")
  private String city;

  @NotBlank(message = "The Zip code is required.")
  @Pattern(regexp = "^\\d{5}-\\d{3}$", flags = { Flag.CASE_INSENSITIVE,
      Flag.MULTILINE }, message = "The Zip code is invalid. Use format DDDDD-DDD.")
  private String zip;

  @NotBlank(message = "The street name is required.")
  private String street;

  @NotBlank(message = "The district is required.")
  private String district;

  private String state;

  public Address toAddress() {
    Address address = new Address();
    address.setCountry(country);
    address.setCity(city);
    address.setZip(zip);
    address.setStreet(street);
    address.setState(state);
    address.setDistrict(district);
    return address;
  }
}
