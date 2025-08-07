package com.example.zyno.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.zyno.model.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products, String> {
    
}
