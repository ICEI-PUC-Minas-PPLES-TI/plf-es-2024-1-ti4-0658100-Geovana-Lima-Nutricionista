package glnutricionista.backend.services;

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
}
