package glnutricionista.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import glnutricionista.backend.services.NotificationService;

@RestController
@RequestMapping(value = "/notifications")
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  @GetMapping
  public ResponseEntity<?> getNotifications() {
    try {
      return ResponseEntity.ok(notificationService.getNotifications());
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid data provided", e);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteNotification(@PathVariable Long id) {
    try {
      notificationService.deleteNotification(id);
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid data provided", e);
    }
  }
}
