package glnutricionista.backend.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<?> createAppointment(@RequestBody @Valid AppointmentDTO appointmentDTO) {
        try {
            Appointment createdAppointment = appointmentService.createAppointment(appointmentDTO.toAppointment());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAppointment);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Appointment>> getAllPatientAppointments(@PathVariable Long id) {
        List<Appointment> patientAppointments = appointmentService.getAllPatientAppointments(id);
        return ResponseEntity.ok(patientAppointments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentService.getAppointment(id);
        if (appointment == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found");
        }
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id,
            @RequestBody @Valid AppointmentDTO appointmentDTO) {
        try {
            Appointment updatedAppointment = appointmentService.updateAppointment(id, appointmentDTO.toAppointment());
            return ResponseEntity.ok(updatedAppointment);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid data provided", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}
