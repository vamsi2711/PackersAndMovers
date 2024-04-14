package com.movesmart.movesmartapi.controller;

import com.movesmart.movesmartapi.model.Packer;
import com.movesmart.movesmartapi.model.ServiceTypes;
import com.movesmart.movesmartapi.repository.PackerRepository;
import com.movesmart.movesmartapi.repository.ServiceTypesRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class MappingController {

  @Autowired
  private PackerRepository packerRepository;

  @Autowired
  private ServiceTypesRepository serviceTypesRepository;

  @SneakyThrows
  @PostMapping("/packers/{packerId}/services/{serviceId}")
  public Packer addPackerToService(@PathVariable String packerId, @PathVariable String serviceId) {
    Packer packer = packerRepository.findById(packerId)
        .orElseThrow(() -> new Exception("Packer not found"));
    ServiceTypes service = serviceTypesRepository.findById(serviceId)
        .orElseThrow(() -> new Exception("ServiceTypes not found"));
    packer.getServices().add(service);
//    service.getPackers().add(packer);
    packerRepository.save(packer);
    return packer;
  }

  @SneakyThrows
  @DeleteMapping("/packers/{packerId}/services/{serviceId}")
  public Packer removePackerFromService(@PathVariable String packerId,
      @PathVariable String serviceId) {
    Packer packer = packerRepository.findById(packerId)
        .orElseThrow(() -> new Exception("Packer not found"));
    ServiceTypes service = serviceTypesRepository.findById(serviceId)
        .orElseThrow(() -> new Exception("ServiceTypes not found"));
    packer.getServices().remove(service);
//    service.getPackers().remove(packer);
    packerRepository.save(packer);
    return packer;
  }

}
