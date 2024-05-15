package glnutricionista.backend.DTO;

import glnutricionista.backend.models.PatientRecord;

public class PatientRecordDTO {

    private double weight;
    private double height;
    private String physicalActivities;
    private double imc;
    private double waist;
    private double bust;
    private String observations;

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

    public PatientRecord toPatientRecord() {
        PatientRecord patientRecord = new PatientRecord();

        patientRecord.setWeight(this.weight);
        patientRecord.setHeight(this.height);
        patientRecord.setPhysicalActivities(this.physicalActivities);
        patientRecord.setImc(this.imc);
        patientRecord.setWaist(this.waist);
        patientRecord.setBust(this.bust);
        patientRecord.setObservations(this.observations);

        return patientRecord;
    }
}
