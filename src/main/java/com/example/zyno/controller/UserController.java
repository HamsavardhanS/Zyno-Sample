package com.example.zyno.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.zyno.model.User;
import com.example.zyno.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
    @PostMapping("/save")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
    @PutMapping("/update/{username}")
    public User updateUser(@RequestBody User user, @PathVariable String username) {
        return userService.updateUser(user, username);
    }
    @DeleteMapping("/delete/{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
    }
}
