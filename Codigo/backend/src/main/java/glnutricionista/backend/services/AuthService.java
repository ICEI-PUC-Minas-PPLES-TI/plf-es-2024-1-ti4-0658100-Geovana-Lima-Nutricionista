package glnutricionista.backend.services;

import glnutricionista.backend.DTO.LoginDTO;
import glnutricionista.backend.models.Nutritionist;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {

    public Boolean canLogin(Nutritionist nutritionist, LoginDTO loginDTO) {

        return Objects.equals(nutritionist.getPassword(), loginDTO.getPassword());
    }
}
