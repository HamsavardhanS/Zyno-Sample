package com.example.zyno.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.zyno.model.User;
import com.example.zyno.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User getUserByUsername(String username) {
        return userRepository.findById(username).orElse(null);
    }
    public void deleteUser(String username) {
        userRepository.deleteById(username);
    }
    public User updateUser(User user, String username) {
        return userRepository.findById(username)
            .map(existingUser -> {
                existingUser.setMobileNumber(user.getMobileNumber());
                existingUser.setEmail(user.getEmail());
                existingUser.setFirstName(user.getFirstName());
                existingUser.setLastname(user.getLastname());
                return userRepository.save(existingUser);
            })
            .orElse(null);
    }
}
