package glnutricionista.backend.services.email.strategy;

import glnutricionista.backend.models.EmailTypeEnum;
import jakarta.mail.MessagingException;

import java.io.IOException;

public interface EmailStrategy {

    void execute(final String email) throws MessagingException, IOException;

    EmailTypeEnum applyTo();
}
