package com.example.raresm.sdproject1.dtos;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class MeasurementDTO {

    @NotNull
    private Timestamp time;
    @NotNull
    private Integer deviceId;
    @NotNull
    private Double measValue;
}
