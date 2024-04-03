package glnutricionista.backend.repositories;

import glnutricionista.backend.models.Nutritionist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NutritionistRepository extends JpaRepository<Nutritionist, Long> {

    Nutritionist findByEmail(String email);
}
