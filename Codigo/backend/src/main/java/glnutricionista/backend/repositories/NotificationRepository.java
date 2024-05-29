package glnutricionista.backend.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import glnutricionista.backend.models.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
  @Query("SELECT n FROM Notification n WHERE n.createdAt >= :threeDaysAgo ORDER BY n.createdAt DESC")
  List<Notification> findAllCreatedAfter(@Param("threeDaysAgo") LocalDate threeDaysAgo);
}
