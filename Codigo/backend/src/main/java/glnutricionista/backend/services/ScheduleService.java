package glnutricionista.backend.services;

import glnutricionista.backend.models.Appointment;
import glnutricionista.backend.models.EmailTypeEnum;
import glnutricionista.backend.models.Notification;
import glnutricionista.backend.models.Patient;
import glnutricionista.backend.models.StatusEnum;
import glnutricionista.backend.repositories.AppointmentRepository;
import glnutricionista.backend.repositories.NutritionistRepository;
import glnutricionista.backend.services.email.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class ScheduleService {

    private final AppointmentRepository appointmentRepository;

    private final EmailService emailService;

    private final NutritionistRepository nutritionistRepository;

    private final NotificationService notificationService;

    public ScheduleService(AppointmentRepository appointmentRepository, EmailService emailService,
            NutritionistRepository nutritionistRepository, NotificationService notificationService) {
        this.appointmentRepository = appointmentRepository;
        this.emailService = emailService;
        this.nutritionistRepository = nutritionistRepository;
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void verificarConsultasParaMarcar() {

        final var hoje = LocalDate.now();
        final var vinteDiasAntes = hoje.minusDays(20);

        final var consultas = appointmentRepository.findByDate(vinteDiasAntes);

        consultas
                .stream()
                .filter(consulta -> consulta.getStatus().equals(StatusEnum.CONCLUIDO.name()))
                .forEach(this::enviarEmailsAvisoRemarcacao);
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void verificarConsultasProximas() {

        final var hoje = LocalDate.now();
        final var doisDiasDepois = hoje.plusDays(2);

        final var consultas = appointmentRepository.findByDateBetween(hoje, doisDiasDepois);

        consultas
                .stream()
                .filter(consulta -> consulta.getStatus().equals(StatusEnum.MARCADO.name()))
                .forEach(this::enviarEmailsAviso48HorasAntes);
    }

    private void enviarEmailsAviso48HorasAntes(Appointment consulta) {

        final var paciente = consulta.getPatient();

        String formattedDate = consulta.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        String formattedTime = consulta.getHour().format(DateTimeFormatter.ofPattern("HH:mm"));
        criarNotificacao(paciente, "Consulta Próxima",
                "A consulta com o paciente está próxima, data: " + formattedDate + " " + formattedTime);

        try {
            enviarEmailParaPaciente48HorasAntes(paciente);
            enviarEmailParaNutricionista48HorasAntes(paciente);
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
    }

    private void enviarEmailParaPaciente48HorasAntes(Patient paciente) throws MessagingException, IOException {

        emailService.sendEmail(paciente.getEmail(), EmailTypeEnum.NEXT_APPOINTMENT.name());
    }

    private void enviarEmailParaNutricionista48HorasAntes(Patient paciente) throws MessagingException, IOException {

        emailService.sendEmail(paciente.getEmail(), EmailTypeEnum.NEXT_NUTRITIONIST_APPOINTMENT.name());
    }

    private void enviarEmailsAvisoRemarcacao(Appointment consulta) {

        final var paciente = consulta.getPatient();

        criarNotificacao(paciente, "Lembrete para remarcar consulta",
                "Já se passaram 20 dias desde a última consulta.");

        try {
            enviarEmailParaNutricionistaVinteDiasAposConsulta(paciente);
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
    }

    private void enviarEmailParaNutricionistaVinteDiasAposConsulta(Patient patient)
            throws MessagingException, IOException {

        emailService.sendEmail(patient.getEmail(), EmailTypeEnum.NEXT_NUTRITIONIST_APPOINTMENT.name());
    }

    private void criarNotificacao(Patient paciente, String titulo, String descricao) {
        Notification notificacao = new Notification();
        notificacao.setPatient(paciente);
        notificacao.setTitle(titulo);
        notificacao.setDescription(descricao);
        notificationService.createNotification(notificacao);
    }
}
