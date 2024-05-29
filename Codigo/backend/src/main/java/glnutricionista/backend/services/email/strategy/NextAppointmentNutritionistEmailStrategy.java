package glnutricionista.backend.services.email.strategy;

import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.EmailTypeEnum;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.models.StatusEnum;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.NutritionistRepository;
import glnutricionista.backend.repositories.PatientRepository;
import jakarta.mail.MessagingException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.LocalDateTime;
import java.util.Comparator;

@Component
public class NextAppointmentNutritionistEmailStrategy implements EmailStrategy {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    private final NutritionistRepository nutritionistRepository;

    public NextAppointmentNutritionistEmailStrategy(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine, PatientRepository patientRepository, AppointmentRepository appointmentRepository, NutritionistRepository nutritionistRepository) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
        this.nutritionistRepository = nutritionistRepository;
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

        final var emailNutritionist = this.getEmailNutritionist();

        final var context = new Context();

        context.setVariable("nome", name);
        context.setVariable("dataConsulta", appointment.getDate().toString());
        context.setVariable("horaConsulta", appointment.getHour().toString());

        final var emailContent = templateEngine.process("appointment_notification_nutritionist_template", context);

        helper.setTo(emailNutritionist);
        helper.setSubject("Lembrete de consulta do paciente");
        helper.setText(emailContent, true);

        javaMailSender.send(message);

    }

    @Override
    public EmailTypeEnum applyTo() {
        return EmailTypeEnum.NEXT_NUTRITIONIST_APPOINTMENT;
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

    private String getEmailNutritionist() {
        return nutritionistRepository.findAll().get(0).getEmail();
    }
}
