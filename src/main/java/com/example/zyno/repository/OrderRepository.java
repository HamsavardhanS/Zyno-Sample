package com.example.zyno.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.zyno.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    
    // Additional query methods can be defined here if needed
    
}
