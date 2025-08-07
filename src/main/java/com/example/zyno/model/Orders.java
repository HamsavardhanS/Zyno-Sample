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
import lombok.Data;

@Entity
@Data
public class Orders {
    @Id
    private Long orderId;
    private String userId;
    private String productId;
    private String address;
    private int quantity;
    private LocalDateTime orderDate;
    private LocalDate expectedDelivery;

    @OneToOne(mappedBy = "orderId")
    private Transaction transaction;

    @ManyToOne(targetEntity = User.class)
    private User user;

    @ManyToMany(mappedBy = "orders")
    @JoinTable(
        name = "order_products",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Products> products;

}
