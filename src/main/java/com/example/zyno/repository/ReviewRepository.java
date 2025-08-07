package com.example.zyno.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.zyno.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    
}