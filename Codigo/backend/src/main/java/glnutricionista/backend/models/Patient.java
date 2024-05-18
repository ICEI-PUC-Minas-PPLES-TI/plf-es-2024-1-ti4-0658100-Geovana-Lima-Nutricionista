package glnutricionista.backend.models;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Accessors(chain = true)
@Table(name = "patient")
public class Patient implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "patient")
  private List<PatientRecord> records;

  @Column(length = 100, nullable = false)
  private String name;

  @Column(length = 250, nullable = false)
  private String email;

  @Column(length = 50, nullable = false)
  private String birthDate;

  @Column(length = 50, nullable = false)
  private String occupation;

  @Column(length = 250, nullable = false)
  private String goal;
  
  @Transient // Este campo não será mapeado para o banco de dados
  private long totalAppointments;

  @Transient
  private int age;

  @Transient // Este campo não será mapeado para o banco de dados
  private double totalPrice;
  
  @OneToOne
  private Address address;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public List<PatientRecord> getRecords() {
    return this.records;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getBirthDate() {
    return this.birthDate;
  }

  public void setBirthDate(String birthDate) {
    this.birthDate = birthDate;
  }

  public String getOccupation() {
    return this.occupation;
  }

  public void setOccupation(String occupation) {
    this.occupation = occupation;
  }

  public String getGoal() {
    return this.goal;
  }

  public void setGoal(String goal) {
    this.goal = goal;
  }

  public long getTotalAppointments() {
    return this.totalAppointments;
  }

  public void setTotalAppointments(long totalAppointments)
  {
    this.totalAppointments = totalAppointments;
  }

  public double getTotalPrice() {
    return this.totalPrice;
  }

  public void setTotalPrice(double totalPrice) {
    this.totalPrice = totalPrice;
  }

  public Address getAddress() {
    return this.address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public int getAge() {
    return this.age;
  }

  public void setAge(int age) {
    this.age = age;
  }
}
