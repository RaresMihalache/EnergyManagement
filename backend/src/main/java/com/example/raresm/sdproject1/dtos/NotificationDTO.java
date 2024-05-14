package com.example.raresm.sdproject1.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class NotificationDTO {
    private Integer userId;
    private String username;
    private Integer deviceId;
    private Double measurementConsumption;
    private Double difference;

}
