package com.example.zyno.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Product")
public class Product {

    @Id
    private String productId;
    private String productName;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Image> images;

    private String category;
    private String productDescription;
    private double price;
    private int stockQuantity;

    @JsonIgnore
    @ManyToMany(mappedBy = "wishlist")
    private List<User> usersWhoWished;

    @JsonIgnore
    @ManyToMany(mappedBy = "products")
    private List<Order> orders;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Review> reviews;
}
