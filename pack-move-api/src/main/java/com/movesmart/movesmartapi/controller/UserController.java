package com.movesmart.movesmartapi.controller;

import com.movesmart.movesmartapi.model.Packer;
import com.movesmart.movesmartapi.model.User;
import com.movesmart.movesmartapi.repository.PackerRepository;
import com.movesmart.movesmartapi.repository.UserRepository;
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
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/getAllUsers")
  public List<User> getUsers() {
    log.info("Read request received to get all Users ");
    return userRepository.findAll();
  }

  @GetMapping("/{id}")
  public User getUser(@PathVariable String id) {
    log.info("Read request received to  User ");
    return userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
  }

  @PutMapping("/{id}")
  public User updateUser(@PathVariable String id, @RequestBody User user) {
    return userRepository.findById(id)
        .map(u -> {
          u.setName(user.getName());
          u.setEmail(user.getEmail());
          u.setPhoneNo(user.getPhoneNo());
          u.setPassword(user.getPassword());
          return userRepository.save(u);
        })
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
  }

  @PostMapping("")
  public User createUser(@RequestBody User userDetails) {
    log.info("Create request received to register User ");
    return userRepository.save(userDetails);
  }

  @DeleteMapping("/{id}")
  public void deleteUser(@PathVariable String id) {
    userRepository.deleteById(id);
  }

}
