package glnutricionista.backend.services;

import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.EmailTypeEnum;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.NutritionistRepository;
import glnutricionista.backend.services.email.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;

@Service
public class ScheduleService {

    private final AppointmentRepository appointmentRepository;

    private final EmailService emailService;

    private final NutritionistRepository nutritionistRepository;

    public ScheduleService(AppointmentRepository appointmentRepository, EmailService emailService, NutritionistRepository nutritionistRepository) {
        this.appointmentRepository = appointmentRepository;
        this.emailService = emailService;
        this.nutritionistRepository = nutritionistRepository;
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void verificarConsultasProximas() {

        final var hoje = LocalDate.now();
        final var doisDiasDepois = hoje.plusDays(2);

        final var consultas = appointmentRepository.findByDateBetween(hoje, doisDiasDepois);

        consultas
                .forEach(this::enviarEmailsAviso);
    }

    private void enviarEmailsAviso(Appointment consulta) {

        final var paciente = consulta.getPatient();

        try {
            enviarEmailParaPaciente(paciente);
            enviarEmailParaNutricionista(paciente, consulta);
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
    }

    private void enviarEmailParaPaciente(Patient paciente) throws MessagingException, IOException {

        emailService.sendEmail(paciente.getEmail(), EmailTypeEnum.NEXT_APPOINTMENT.name());
    }

    private void enviarEmailParaNutricionista(Patient paciente, Appointment consulta) throws MessagingException, IOException {

        final var nutritionist = nutritionistRepository.findAll();

        final var email = nutritionist.get(0).getEmail();

        emailService.sendEmail(email, EmailTypeEnum.NEXT_NUTRITIONIST_APPOINTMENT.name());
    }
}
