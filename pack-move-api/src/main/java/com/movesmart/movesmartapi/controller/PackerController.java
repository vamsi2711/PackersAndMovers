package com.movesmart.movesmartapi.controller;

import com.movesmart.movesmartapi.model.Packer;
import com.movesmart.movesmartapi.repository.PackerRepository;
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
@RequestMapping("/packer")
public class PackerController {

  @Autowired
  private PackerRepository packerRepository;

  //  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/getAllPackers")
  public List<Packer> getPackers() {
    log.info("Read request received to get all Packers ");
    return packerRepository.findAll();
  }

  @GetMapping("/{id}")
  public Packer getUser(@PathVariable String id) {
    return packerRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Packer not found with id: " + id));
  }

  @GetMapping("/getByUserId/{id}")
  public Packer getPackerByUserId(@PathVariable String id) {
    log.info("Getting Packer by userID ", id);
    return packerRepository.findByUserId(id);

  }

  @PostMapping("")
  public Packer createUser(@RequestBody Packer packer) {
    return packerRepository.save(packer);
  }

  @PutMapping("/{id}")
  public Packer updateUser(@PathVariable String id, @RequestBody Packer packer) {
    return packerRepository.findById(id)
        .map(u -> {
          u.setName(packer.getName());
          u.setEmail(packer.getEmail());
          u.setPhoneNo(packer.getPhoneNo());
          u.setCity(packer.getCity());
          u.setState(packer.getState());
          u.setServices(packer.getServices());
          return packerRepository.save(u);
        })
        .orElseThrow(() -> new EntityNotFoundException("Packer not found with id: " + id));
  }

  @DeleteMapping("/{id}")
  public void deleteUser(@PathVariable String id) {
    packerRepository.deleteById(id);
  }

}
