package glnutricionista.backend.Models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "address")
public class Address implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 100, nullable = false)
  private String street;

  @Column(length = 100, nullable = false)
  private String district;

  @Column(length = 100, nullable = false)
  private String city;

  @Column(length = 2, nullable = false)
  private String state;

  @Column(length = 9, nullable = false)
  private String zip;

  @Column(length = 50, nullable = false)
  private String country;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getStreet() {
    return this.street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public String getDistrict() {
    return this.district;
  }

  public void setDistrict(String district) {
    this.district = district;
  }

  public String getCity() {
    return this.city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return this.state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getZip() {
    return this.zip;
  }

  public void setZip(String zip) {
    this.zip = zip;
  }

  public String getCountry() {
    return this.country;
  }

  public void setCountry(String country) {
    this.country = country;
  }
}
