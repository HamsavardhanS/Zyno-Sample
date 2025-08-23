package com.example.zyno.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Transaction {
    @Id
    private String transactionId;
    private Double amount;
    private String paymentMethod;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
