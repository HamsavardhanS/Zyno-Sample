package com.example.zyno.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.zyno.model.CartItem;
import com.example.zyno.service.CartItemService;

@RestController
@RequestMapping("/cart-items")
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/all")
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }
    @GetMapping("/user/{userId}")
    public List<CartItem> getCartItemsByUserId(@RequestParam String userId)
    {
        return cartItemService.getCartItemsByUserId(userId);
    }
    @GetMapping("/product/{productId}")
    public List<CartItem> getCartItemsByProductId(@RequestParam String productId)
    {
        return cartItemService.getCartItemsByProductId(productId);
    }
    @GetMapping("/price-range")
    public List<CartItem> getCartItemsByPriceRange(@RequestParam double minPrice, @RequestParam double maxPrice) {
        return cartItemService.getCartItemsByPriceRange(minPrice, maxPrice);
    }
    @GetMapping("/category/{category}")
    public List<CartItem> getCartItemsByCategory(@RequestParam String category) {
        return cartItemService.getCartItemsByCategory(category);
    }
    @GetMapping("/name/{name}")
    public List<CartItem> getCartItemsByName(@RequestParam String name) {
        return cartItemService.getCartItemsByName(name);
    }
    @GetMapping("/{id}")
    public CartItem getCartItemById(@RequestParam Long id) {
        return cartItemService.getCartItemById(id);
    }
    @PutMapping("/{id}")
    public CartItem updateCartItem(@RequestParam Long id, @RequestParam CartItem cartItem) {
        return cartItemService.updateCartItem(cartItem, id);
    }
    @PutMapping("/add")
    public void addCartItem(@RequestParam CartItem cartItem) {
        cartItemService.addCartItem(cartItem);
    }
    @PutMapping("/remove/{id}")
    public void removeCartItem(@RequestParam Long id) {
        cartItemService.removeCartItem(id);
    }
}
