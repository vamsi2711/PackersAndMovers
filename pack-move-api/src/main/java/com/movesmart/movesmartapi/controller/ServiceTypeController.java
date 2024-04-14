package com.movesmart.movesmartapi.controller;

import com.movesmart.movesmartapi.model.Packer;
import com.movesmart.movesmartapi.model.ServiceTypes;
import com.movesmart.movesmartapi.repository.ServiceTypesRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/service")
public class ServiceTypeController {

  @Autowired
  private ServiceTypesRepository serviceTypesRepository;

  @GetMapping("/getAllServices")
  public List<ServiceTypes> getPackers() {
    log.info("Read request received to get all Services ");
    return serviceTypesRepository.findAll();
  }

  @GetMapping("/{id}")
  public ServiceTypes getService(@PathVariable String id) {
    return serviceTypesRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("ServiceTypes not found with id: " + id));
  }

  @PostMapping("")
  public ServiceTypes createService(@RequestBody ServiceTypes service) {
    return serviceTypesRepository.save(service);
  }

  @PutMapping("/{id}")
  public ServiceTypes updateService(@PathVariable String id, @RequestBody ServiceTypes service) {
    return serviceTypesRepository.findById(id)
        .map(u -> {
          u.setServiceType(service.getServiceType());
          u.setActive(service.isActive());
          return serviceTypesRepository.save(u);
        })
        .orElseThrow(() -> new EntityNotFoundException("ServiceTypes not found with id: " + id));
  }

  @DeleteMapping("/{id}")
  public void deleteService(@PathVariable String id) {
    serviceTypesRepository.deleteById(id);
  }

}
