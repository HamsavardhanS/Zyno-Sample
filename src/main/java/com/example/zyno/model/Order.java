package com.example.zyno.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Orders")
@Data
public class Order {
    @Id
    private String orderId;
    private String userId;
    private String productId;
    private String address;
    private int quantity;
    private double totalAmount;
    private LocalDateTime orderDate;
    private LocalDate expectedDelivery;

    @JsonIgnore
    @OneToOne(mappedBy = "order")
    private Transaction transaction;

    @ManyToOne(targetEntity = User.class)
    private User user;

    //@JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "order_products",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

}
