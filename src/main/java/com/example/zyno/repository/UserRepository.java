package com.example.zyno.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.zyno.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
