package glnutricionista.backend.services.email;

import jakarta.mail.MessagingException;

import java.io.IOException;

public interface EmailService {

    void sendEmail(final String email, final String emailType) throws MessagingException, IOException;

}
