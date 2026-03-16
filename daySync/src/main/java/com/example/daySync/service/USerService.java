package com.example.daySync.service;

import com.example.daySync.model.User;
import com.example.daySync.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class USerService {

private final UserRepository repo;

public USerService(UserRepository repo){
this.repo = repo;
}

public User register(User user){
return repo.save(user);
}

public boolean login(String username,String password){

User user = repo.findByUsername(username);

if(user==null){
return false;
}

return user.getPassword().equals(password);
}
}