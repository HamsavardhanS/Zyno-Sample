package com.example.zyno.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Transaction {
    @Id
    private Long transactionId;
    private Long orderId;
    private Double amount;
    private String paymentMethod;

    @OneToOne(mappedBy = "transaction")
    private Orders order;
}
