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
public class BookAppointmentNutritionistEmailStrategy implements EmailStrategy {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    private final NutritionistRepository nutritionistRepository;

    public BookAppointmentNutritionistEmailStrategy(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine, PatientRepository patientRepository, AppointmentRepository appointmentRepository, NutritionistRepository nutritionistRepository) {
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

        final var nomePaciente = patient.getName();

        final var emailNutritionist = this.getEmailNutritionist();

        final var context = new Context();

        context.setVariable("nomePaciente", nomePaciente);

        final var emailContent = templateEngine.process("book_appointment_notification_template", context);

        helper.setTo(emailNutritionist);
        helper.setSubject("Lembrete para remarcação de consulta");
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }

    @Override
    public EmailTypeEnum applyTo() {
        return EmailTypeEnum.REMEMBER_TO_BOOK_APPOINTMENT;
    }

    private Patient getPatient(final String email) {

        return patientRepository.findByEmail(email);
    }

    private String getEmailNutritionist() {
        return nutritionistRepository.findAll().get(0).getEmail();
    }
}
