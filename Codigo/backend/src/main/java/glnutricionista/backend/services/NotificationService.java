package glnutricionista.backend.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import glnutricionista.backend.models.Notification;
import glnutricionista.backend.repositories.NotificationRepository;

public class NotificationService {
  @Autowired
  private NotificationRepository notificationRepository;

  public Notification createNotification(Notification notification) {
    return notificationRepository.save(notification);
  }

  public List<Notification> getNotifications() {
    LocalDate threeDaysAgo = LocalDate.now().minusDays(3);
    return notificationRepository.findAllCreatedAfter(threeDaysAgo);
  }

  public void deleteNotification(Long id) {
    notificationRepository.deleteById(id);
  }
}
