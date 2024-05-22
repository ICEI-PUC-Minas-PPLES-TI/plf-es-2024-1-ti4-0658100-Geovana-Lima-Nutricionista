package glnutricionista.backend.services.email.strategy;

import glnutricionista.backend.models.EmailTypeEnum;
import glnutricionista.backend.repositories.PatientRepository;
import jakarta.mail.MessagingException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

public class NextAppointmentEmailStrategy implements EmailStrategy {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final PatientRepository patientRepository;

    public NextAppointmentEmailStrategy(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine, PatientRepository patientRepository) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
        this.patientRepository = patientRepository;
    }

    @Override
    public void execute(String email) throws MessagingException {

        final var message = javaMailSender.createMimeMessage();
        final var helper = new MimeMessageHelper(message, true);
        final var name = this.getUsername(email);

        final var context = new Context();
        context.setVariable("nome", name);

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

    private String getUsername(final String email) {

        final var patient = patientRepository.findByEmail(email);

        if (patient != null) {
            return patient.getName();
        }

        return null;
    }
}
