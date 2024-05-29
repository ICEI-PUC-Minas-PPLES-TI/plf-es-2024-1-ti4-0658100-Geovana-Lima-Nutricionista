package glnutricionista.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class NutritionistDTO {

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}
