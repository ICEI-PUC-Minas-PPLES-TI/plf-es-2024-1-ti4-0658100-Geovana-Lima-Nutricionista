package glnutricionista.backend.services;

import glnutricionista.backend.DTO.NutritionistDTO;
import glnutricionista.backend.models.Nutritionist;
import glnutricionista.backend.repositories.NutritionistRepository;
import org.springframework.stereotype.Service;

@Service
public class NutritionistService {

    private final NutritionistRepository repository;

    public NutritionistService(NutritionistRepository repository) {
        this.repository = repository;
    }

    public Nutritionist getNutritionist(final String email) {

        return repository.findByEmail(email);
    }

    public Nutritionist updateNutritionist(final NutritionistDTO request, final Long id) {

        final var nutritionist = repository.findById(id);

        return nutritionist.map(repository::save)
                .orElse(null);

    }
}
