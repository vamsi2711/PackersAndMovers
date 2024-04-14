package com.movesmart.movesmartapi.controller;

import com.movesmart.movesmartapi.model.AgentRegisterRequest;
import com.movesmart.movesmartapi.model.Feedback;
import com.movesmart.movesmartapi.model.LoginRequest;
import com.movesmart.movesmartapi.model.LoginResponse;
import com.movesmart.movesmartapi.service.LoginService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/user")
public class LoginController {

  private final LoginService loginService;

  @PostMapping("/login")
  public ResponseEntity<?> createUser(@RequestBody LoginRequest credentials) {
    LoginResponse res = loginService.validateLogin(credentials);
    return ResponseEntity.ok(res);
  }
  @PostMapping("/agent-register")
  public ResponseEntity<String> registerAgent(@RequestBody AgentRegisterRequest userDetails) {
    String res = loginService.registerAgent(userDetails);
    return ResponseEntity.ok(res);
  }
}
