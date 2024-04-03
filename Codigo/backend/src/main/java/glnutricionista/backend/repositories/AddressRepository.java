package glnutricionista.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import glnutricionista.backend.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
  
}
