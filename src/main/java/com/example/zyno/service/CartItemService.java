package com.example.zyno.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.zyno.repository.CartItemRepository;
import com.example.zyno.model.CartItem;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;

    public void addCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }
    public void removeCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
    public CartItem getCartItemById(Long id) {
        return cartItemRepository.findById(id).orElse(null);
    }
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }
    public List<CartItem> getCartItemsByUserId(String userId) {
        return cartItemRepository.findAll().stream()
            .filter(cartItem -> cartItem.getUser() != null && cartItem.getUser().getUsername().equals(userId))
            .toList();
    }
    public CartItem updateCartItem(CartItem cartItem, Long id) {
        return cartItemRepository.findById(id)
            .map(existingCartItem -> {
                existingCartItem.setProduct(cartItem.getProduct());
                existingCartItem.setQuantity(cartItem.getQuantity());
                existingCartItem.setUser(cartItem.getUser());
                return cartItemRepository.save(existingCartItem);
            })
            .orElse(null);
    }
    public List<CartItem> getCartItemsByProductId(String productId) {
        return cartItemRepository.findAll().stream()
            .filter(cartItem -> cartItem.getProduct() != null && cartItem.getProduct().getProductId().equals(productId))
            .toList();
    }
    public List<CartItem> getCartItemsByCategory(String category) {
        return cartItemRepository.findAll().stream()
            .filter(cartItem -> cartItem.getProduct() != null && category.equals(cartItem.getProduct().getCategory()))
            .toList();
    }
    public List<CartItem> getCartItemsByPriceRange(double minPrice, double maxPrice) {
        return cartItemRepository.findAll().stream()
            .filter(cartItem -> cartItem.getProduct() != null && 
                cartItem.getProduct().getPrice() >= minPrice && 
                cartItem.getProduct().getPrice() <= maxPrice)
            .toList();
    }
    public List<CartItem> getCartItemsByName(String name) {
        return cartItemRepository.findAll().stream()
            .filter(cartItem -> cartItem.getProduct() != null && 
                cartItem.getProduct().getProductName().toLowerCase().contains(name.toLowerCase()))
            .toList();
    }
    public List<CartItem> getCartItemsByDescription(String description) {
        return cartItemRepository.findAll().stream()
            .filter(cartItem -> cartItem.getProduct() != null && 
                cartItem.getProduct().getProductDescription().toLowerCase().contains(description.toLowerCase()))
            .toList();
    }

}
