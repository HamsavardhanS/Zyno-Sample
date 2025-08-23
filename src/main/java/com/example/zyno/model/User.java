package com.example.zyno.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Users")
public class User {
    @Id
    //Login-measures:
    private String username;
    private String password;
    //Register-measures:
    private int mobileNumber;
    private String email;
    private String firstName;
    private String lastname;

    @JsonIgnore
    @OneToMany(mappedBy = "userId")
    private List<Order> orders;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "user_wishlist",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> wishlist;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Review> reviews;
}
