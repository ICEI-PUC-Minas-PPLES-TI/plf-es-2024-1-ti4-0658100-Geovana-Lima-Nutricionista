package glnutricionista.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import glnutricionista.backend.Models.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
  
}
