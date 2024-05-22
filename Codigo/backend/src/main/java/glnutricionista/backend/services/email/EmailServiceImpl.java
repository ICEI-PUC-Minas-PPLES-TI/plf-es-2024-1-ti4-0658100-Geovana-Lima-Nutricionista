package glnutricionista.backend.services.email;

import glnutricionista.backend.models.EmailTypeEnum;
import glnutricionista.backend.services.email.strategy.EmailStrategy;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class EmailServiceImpl {

    private final List<EmailStrategy> strategies;

    public EmailServiceImpl(List<EmailStrategy> strategies) {
        this.strategies = strategies;
    }

    public void sendEmail(final String email, final String emailType) {

        strategies
                .stream()
                .filter(strategy -> strategy.applyTo().equals(EmailTypeEnum.valueOf(emailType)))
                .findFirst()
                .ifPresent(strategy -> {
                    try {
                        strategy.execute(email);
                    } catch (MessagingException | IOException e) {
                        throw new RuntimeException(e);
                    }
                });
    }
}
