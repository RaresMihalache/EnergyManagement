package com.example.raresm.sdproject1.controllers;

import com.example.raresm.sdproject1.dtos.NotificationDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/measurement")
public class ConsumptionController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @EventListener(NotificationDTO.class)
    public void handleEvent(NotificationDTO notificationDTO){
        log.info("Got an event: {}.", notificationDTO);
        simpMessagingTemplate.convertAndSend("/topic/events", notificationDTO);
    }
}
