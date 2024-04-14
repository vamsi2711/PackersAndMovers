package com.movesmart.movesmartapi.service;


import com.movesmart.movesmartapi.model.AgentRegisterRequest;
import com.movesmart.movesmartapi.model.LoginRequest;
import com.movesmart.movesmartapi.model.LoginResponse;
import com.movesmart.movesmartapi.model.Packer;
import com.movesmart.movesmartapi.model.User;
import com.movesmart.movesmartapi.repository.PackerRepository;
import com.movesmart.movesmartapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PackerRepository packerRepository;

  @Override
  @SneakyThrows
  public LoginResponse validateLogin(LoginRequest loginRequest) {
    String username = loginRequest.getUsername();
    String password = loginRequest.getPassword();

    // retrieve the user from the database
    User user = userRepository.findByEmail(username);

    if (user == null || !password.equals(user.getPassword())) {
      return new LoginResponse();
    }
    return LoginResponse.builder().id(user.getId()).email(username).role(user.getRole()).name(user.getName()).build();

  }

  @Override
  @SneakyThrows
  public String registerAgent(AgentRegisterRequest userDetails) {
//    try {
//    User user = userRepository.save(userDetails.getUser());
    Packer packer = packerRepository.save(userDetails.getPacker());
    if (packer.getId().isEmpty()) {
      return "Error while registering..!";
    }

    return "Agent registered successfully";
//    }
//    catch (Exception ex){
//      log.error("Exception: {}", ex.getMessage());
//      return th ex.getMessage();
//    }
  }


}
