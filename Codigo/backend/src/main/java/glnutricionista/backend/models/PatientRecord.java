package glnutricionista.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "patient_record")
public class PatientRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Patient patient;

    @Column(nullable = false)
    private double weight;

    @Column(nullable = false)
    private double height;

    @Column(length = 250)
    private String physicalActivities;

    @Column(nullable = false)
    private double imc;

    @Column(nullable = false)
    private double waist;

    @Column(nullable = false)
    private double bust;

    @Column(length = 250)
    private String observations;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public String getPhysicalActivities() {
        return physicalActivities;
    }

    public void setPhysicalActivities(String physicalActivities) {
        this.physicalActivities = physicalActivities;
    }

    public double getImc() {
        return imc;
    }

    public void setImc(double imc) {
        this.imc = imc;
    }

    public double getWaist() {
        return waist;
    }

    public void setWaist(double waist) {
        this.waist = waist;
    }

    public double getBust() {
        return bust;
    }

    public void setBust(double bust) {
        this.bust = bust;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }
}
