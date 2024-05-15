package glnutricionista.backend.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.data.repository.cdi.Eager;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "appointment")
    private PatientRecord record;

    @ManyToOne(fetch = FetchType.LAZY)
    private Patient patient;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime hour;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String status;
}
