package com.example.raresm.sdproject1.consumer;

import com.example.raresm.sdproject1.dtos.MeasurementDTO;
import com.example.raresm.sdproject1.dtos.NotificationDTO;
import com.example.raresm.sdproject1.model.Consumption;
import com.example.raresm.sdproject1.model.Device;
import com.example.raresm.sdproject1.model.User;
import com.example.raresm.sdproject1.repos.BacklogRepository;
import com.example.raresm.sdproject1.repos.ConsumptionRepository;
import com.example.raresm.sdproject1.repos.DeviceRepository;
import com.example.raresm.sdproject1.repos.UserRepository;
import com.example.raresm.sdproject1.services.BacklogService;
import com.example.raresm.sdproject1.services.ConsumptionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class Consumer implements RabbitListenerConfigurer {

    @Autowired
    private ConsumptionRepository consumptionRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BacklogService backlogService;

    private static final Logger logger = LoggerFactory.getLogger(Consumer.class);

    private final ApplicationEventPublisher eventPublisher;


    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receiveMessage(String message) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        MeasurementDTO measurementDTO = objectMapper.readValue(message, MeasurementDTO.class);

        Consumption consumption = new Consumption();
        Optional<Device> foundDevice = deviceRepository.findById(Integer.valueOf(measurementDTO.getDeviceId()));
        if(foundDevice.isEmpty()){
            logger.info("Device with id: " + measurementDTO.getDeviceId() + " not found!");
            return ;
        }

        Date measDate = new Date(measurementDTO.getTime().getTime());
        consumption.setDate(measDate);
        consumption.setConsumptionValue(measurementDTO.getMeasValue());
        consumption.setBacklog(foundDevice.get().getBacklog());
        consumption.setStartHour(measDate.getHours());
        consumption.setEndHour(measDate.getHours() + 1);

        consumptionRepository.save(consumption);
        Double val = backlogService.getSumEnergyHourly(measurementDTO.getDeviceId(), measurementDTO.getTime());
        Double valMaxAccepted = deviceRepository.findById(measurementDTO.getDeviceId()).get().getMaxConsumptionHourly();

        User user = userRepository.findById(deviceRepository.findById(measurementDTO.getDeviceId()).get().getUser().getId()).get();
        eventPublisher.publishEvent(new NotificationDTO(user.getId(), user.getUsername(), measurementDTO.getDeviceId(), measurementDTO.getMeasValue(), val - valMaxAccepted));

        logger.info("Sent: " + measurementDTO);
    }



    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar rabbitListenerEndpointRegistrar) {

    }
}
