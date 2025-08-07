package com.example.zyno.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.zyno.model.CartItem;

public interface CardItemRepository extends JpaRepository<CartItem, Long> {
    
    // Additional query methods can be defined here if neede
    
}
