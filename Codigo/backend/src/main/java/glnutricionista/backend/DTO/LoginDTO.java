package glnutricionista.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginDTO {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}
