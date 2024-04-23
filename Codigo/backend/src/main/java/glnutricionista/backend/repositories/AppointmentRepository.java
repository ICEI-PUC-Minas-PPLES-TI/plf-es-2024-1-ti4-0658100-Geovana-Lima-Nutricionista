package glnutricionista.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import glnutricionista.backend.models.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

}
