package com.movesmart.movesmartapi.service;

import com.movesmart.movesmartapi.model.AgentRegisterRequest;
import com.movesmart.movesmartapi.model.LoginRequest;
import com.movesmart.movesmartapi.model.LoginResponse;

public interface LoginService {


  LoginResponse validateLogin(LoginRequest creds);
  String registerAgent(AgentRegisterRequest userDetails);

}
