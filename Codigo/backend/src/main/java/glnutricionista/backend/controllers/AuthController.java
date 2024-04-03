package glnutricionista.backend.controllers;

import glnutricionista.backend.DTO.LoginDTO;
import glnutricionista.backend.services.AuthService;
import glnutricionista.backend.services.NutritionistService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final NutritionistService service;

    private final AuthService authService;

    public AuthController(NutritionistService service, AuthService authService) {
        this.service = service;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO loginDTO) {

        try {

            final var user = service.getNutritionist(loginDTO.getEmail());

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Usuário não encontrado");
            }

            final var canLogin = authService.canLogin(user, loginDTO);

            if (!canLogin) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos. ");
            }

            return ResponseEntity.ok("Login realizado com sucesso");

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
