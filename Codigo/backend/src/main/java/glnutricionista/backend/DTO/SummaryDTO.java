package glnutricionista.backend.DTO;


public class SummaryDTO {
    private int appointments;
    private Long totalPatients;
    private Double totalRevenue;

    public SummaryDTO(int appointments, Long totalPatients, Double totalRevenue) {
        this.appointments = appointments;
        this.totalPatients = totalPatients;
        this.totalRevenue = totalRevenue;
    }

    // Getters and setters

    public int getAppointments() {
        return appointments;
    }

    public void setAppointments(int appointments) {
        this.appointments = appointments;
    }

    public Long getTotalPatients() {
        return totalPatients;
    }

    public void setTotalPatients(Long totalPatients) {
        this.totalPatients = totalPatients;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
