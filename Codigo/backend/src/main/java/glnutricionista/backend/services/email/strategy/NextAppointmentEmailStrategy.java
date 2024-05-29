package glnutricionista.backend.services.email.strategy;

import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.EmailTypeEnum;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.models.StatusEnum;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.PatientRepository;
import jakarta.mail.MessagingException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;

@Component
public class NextAppointmentEmailStrategy implements EmailStrategy {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final PatientRepository patientRepository;

    private final AppointmentRepository appointmentRepository;

    public NextAppointmentEmailStrategy(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine, PatientRepository patientRepository, AppointmentRepository appointmentRepository) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public void execute(String email) throws MessagingException {

        final var message = javaMailSender.createMimeMessage();
        final var helper = new MimeMessageHelper(message, true);
        final var patient = this.getPatient(email);

        if (patient == null) {
            return;
        }

        final var appointment = this.getAppointmentInfo(patient);

        if (appointment == null) {
            return;
        }

        final var name = patient.getName();
        final var context = new Context();

        context.setVariable("nome", name);
        context.setVariable("dataConsulta", dateFormatter(appointment.getDate()));
        context.setVariable("horaConsulta", appointment.getHour().toString());

        final var emailContent = templateEngine.process("next_appointment_email_template", context);

        helper.setTo(email);
        helper.setSubject("Lembrete de consulta");
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }

    @Override
    public EmailTypeEnum applyTo() {
        return EmailTypeEnum.NEXT_APPOINTMENT;
    }

    private Patient getPatient(final String email) {

        return patientRepository.findByEmail(email);
    }

    private Appointment getAppointmentInfo(Patient patient) {
        final var now = LocalDateTime.now();
        final var twoDaysLater = now.plusDays(2);

        return appointmentRepository.findByPatient(patient.getId()).stream()
                .filter(appointment -> appointment.getStatus().equalsIgnoreCase(StatusEnum.MARCADO.name()))
                .filter(appointment -> !appointment.getDate().atTime(appointment.getHour()).isBefore(now))
                .filter(appointment -> appointment.getDate().atTime(appointment.getHour()).isBefore(twoDaysLater))
                .min(Comparator.comparing(appointment -> appointment.getDate().atTime(appointment.getHour())))
                .orElse(null);
    }

    private String dateFormatter(LocalDate appointmentDate) {

        final var inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        final var outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        final var date = LocalDate.parse(appointmentDate.toString(), inputFormatter);

        return date.format(outputFormatter);
    }
}
