package glnutricionista.backend.DTO;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.StatusEnum;
import lombok.Data;

@Data
public class AppointmentDTO {
    @NotNull(message = "Patient ID cannot be null")
    private Long patientId;

    @NotNull(message = "Date cannot be null")
    private LocalDate date;

    @NotNull(message = "Hour cannot be null")
    private LocalTime hour;

    @NotNull(message = "Price cannot be null")
    private Double price;

    private StatusEnum status;

    private Boolean paid;

    public Appointment toAppointment() {
        Appointment appointment = new Appointment();
        appointment.setDate(this.date);
        appointment.setHour(this.hour);
        appointment.setPrice(this.price);
        appointment.setPaid(false);
        if (this.status == null) {
            this.status = StatusEnum.MARCADO;
        }
        appointment.setStatus(String.valueOf(this.status));
        return appointment;
    }
}
