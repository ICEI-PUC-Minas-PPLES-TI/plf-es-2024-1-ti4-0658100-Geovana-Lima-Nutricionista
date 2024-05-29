package glnutricionista.backend.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "notification")
public class Notification implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 100, nullable = false)
  private String title;

  @Column(length = 250, nullable = false)
  private String description;

  @ManyToOne
  private Patient patient;

  private LocalDate createdAt = LocalDate.now();

  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Patient getPatient() {
    return this.patient;
  }

  public void setPatient(Patient patient) {
    this.patient = patient;
  }

  public LocalDate getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(LocalDate createdAt) {
    this.createdAt = createdAt;
  }
}
