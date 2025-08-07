package com.example.zyno.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.zyno.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    
}
