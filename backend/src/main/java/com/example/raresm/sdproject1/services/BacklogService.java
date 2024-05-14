package com.example.raresm.sdproject1.services;

import com.example.raresm.sdproject1.model.Consumption;
import com.example.raresm.sdproject1.model.Device;
import com.example.raresm.sdproject1.repos.ConsumptionRepository;
import com.example.raresm.sdproject1.repos.DeviceRepository;
import com.example.raresm.sdproject1.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class BacklogService {

    @Autowired
    private ConsumptionRepository consumptionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeviceRepository deviceRepository;

    public Double getSumEnergyHourly(Integer deviceId, Timestamp timestamp){
        Date timestampToDate = new Date(timestamp.getTime());
        Device device = deviceRepository.findDeviceById(deviceId);
        if(device == null) {
            System.out.println("Device not found!");
        }
        List<Consumption> energyConsumptions = consumptionRepository.findConsumptionByBacklogId(deviceId);
        return energyConsumptions.stream().filter(consumption ->
                consumption.getDate().getDay() == timestampToDate.getDay() &&
                consumption.getDate().getMonth() == timestampToDate.getMonth() &&
                consumption.getDate().getHours() == timestampToDate.getHours() &&
                consumption.getDate().getYear() == timestampToDate.getYear()).map(Consumption::getConsumptionValue).reduce((double) 0, Double::sum);
    }
}
