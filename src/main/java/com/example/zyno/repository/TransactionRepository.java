package com.example.zyno.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.zyno.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    // Additional query methods can be defined here if needed
}
