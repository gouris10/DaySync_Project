package com.example.daySync.controller;

import com.example.daySync.model.User;
import com.example.daySync.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

@Autowired
UserRepository repo;

@PostMapping("/register")
public User register(@RequestBody User user){

return repo.save(user);

}

@PostMapping("/login")
public User login(@RequestBody User user){

User u = repo.findByUsername(user.getUsername());

if(u!=null && u.getPassword().equals(user.getPassword())){
return u;
}

return null;

}

}