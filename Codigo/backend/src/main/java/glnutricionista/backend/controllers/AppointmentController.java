package glnutricionista.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import glnutricionista.backend.DTO.AppointmentDTO;
import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.services.AppointmentService;

@RestController
@RequestMapping(value = "/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping()
    public Appointment createAppointment(@RequestBody @Valid AppointmentDTO appointmentDTO) {
        return appointmentService.createAppointment(appointmentDTO.toAppointment());
    }

    @GetMapping()
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointment(@PathVariable Long id) {
        return appointmentService.getAppointment(id);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody @Valid AppointmentDTO appointmentDTO) {
        return appointmentService.updateAppointment(id, appointmentDTO.toAppointment());
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }
}
