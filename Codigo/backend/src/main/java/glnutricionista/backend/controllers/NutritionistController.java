package glnutricionista.backend.controllers;

import glnutricionista.backend.DTO.NutritionistDTO;
import glnutricionista.backend.services.NutritionistService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nutritionist")
public class NutritionistController {

    private final NutritionistService nutritionistService;


    public NutritionistController(NutritionistService nutritionistService) {
        this.nutritionistService = nutritionistService;
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateNutritionist(@RequestBody @Valid final NutritionistDTO request,
                                                @PathVariable final Long id) {

        try {
            final var result = nutritionistService.updateNutritionist(request, id);

            if (request == null) {
                return ResponseEntity.badRequest().body("Nutricionista não encontrada. ");
            }

            return ResponseEntity.ok(result);

        } catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
