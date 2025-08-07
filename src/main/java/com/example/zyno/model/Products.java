package com.example.zyno.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Products")
public class Products {

    @Id
    private String productId;
    private String productName;

    @OneToMany(mappedBy = "product")
    private List<Image> images;

    private String category;
    private String productDescription;
    private double price;
    private int stockQuantity;

    @ManyToMany(mappedBy = "wishlist")
    private List<User> usersWhoWished;

    @ManyToMany(mappedBy = "products")
    private List<Orders> orders;
}
