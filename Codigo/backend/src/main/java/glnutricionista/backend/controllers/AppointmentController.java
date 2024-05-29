package glnutricionista.backend.controllers;

import glnutricionista.backend.DTO.AppointmentDTO;
import glnutricionista.backend.DTO.PatientVisitsDTO;
import glnutricionista.backend.DTO.SummaryDTO;
import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.services.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.*;

@RestController
@RequestMapping(value = "/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping()
    public ResponseEntity<?> createAppointment(@RequestBody @Valid AppointmentDTO appointmentDTO) {
        try {
            Appointment createdAppointment = appointmentService.createAppointment(appointmentDTO.toAppointment(), appointmentDTO.getPatientId());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAppointment);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e);
        }
    }

    @GetMapping("/next-marked")
    public ResponseEntity<List<Appointment>> getNextThreeMarkedAppointments() {
        List<Appointment> appointments = appointmentService.getNextThreeMarkedAppointments();
        return ResponseEntity.ok(appointments);
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

    @GetMapping("/count/{year}")
    public ResponseEntity<Map<String, Long>> countAppointmentsByYear(@PathVariable int year) {
        List<Map.Entry<String, Long>> count = appointmentService.countAppointmentsByMonth(year);

        // Converter os meses para nomes em português
        Map<String, Long> formattedCount = new LinkedHashMap<>();
        for (Map.Entry<String, Long> entry : count) {
            String monthNumber = entry.getKey().split("-")[1];
            String monthName = YearMonth.of(year, Integer.parseInt(monthNumber))
                    .getMonth()
                    .getDisplayName(TextStyle.FULL, new Locale("pt", "BR"));
            formattedCount.put(monthName.toLowerCase(), entry.getValue());
        }

        return ResponseEntity.ok(formattedCount);
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

    @GetMapping("/patient/{id}/visits")
    public ResponseEntity<Map<String, Object>> getPatientVisits(@PathVariable Long id) {
        try {
            String patientName = appointmentService.getPatientNameById(id);
            Long visitCount = appointmentService.countAppointmentsByPatientId(id);
            Map<String, Object> response = new HashMap<>();
            response.put("name", patientName);
            response.put("visits", visitCount);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid data provided", e);
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<SummaryDTO> getSummary() {
        SummaryDTO summary = appointmentService.getSummary();
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/patient-visits")
    public ResponseEntity<List<PatientVisitsDTO>> getAllPatientsWithVisits() {
        List<PatientVisitsDTO> patientVisits = appointmentService.getAllPatientsWithVisits();
        return ResponseEntity.ok(patientVisits);
    }
}
