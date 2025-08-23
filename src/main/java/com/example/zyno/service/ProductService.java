package com.example.zyno.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.zyno.model.Product;
import com.example.zyno.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public Product getProductById(String id) {
        return productRepository.findById(id).orElse(null);
    }
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
    public Product updateProduct(Product product, String id) {
        return productRepository.findById(id)
            .map(existingProduct -> {
                existingProduct.setProductName(product.getProductName());
                existingProduct.setProductDescription(product.getProductDescription());
                existingProduct.setPrice(product.getPrice());
                existingProduct.setCategory(product.getCategory());
                return productRepository.save(existingProduct);
            })
            .orElse(null);
    }
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findAll().stream()
            .filter(product -> category.equals(product.getCategory()))
            .toList();
    }
    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepository.findAll().stream()
            .filter(product -> product.getPrice() >= minPrice && product.getPrice() <= maxPrice)
            .toList();
    }
    public List<Product> getProductsByName(String name) {
        return productRepository.findAll().stream()
            .filter(product -> product.getProductName().toLowerCase().contains(name.toLowerCase()))
            .toList();
    }
    public List<Product> getProductsByDescription(String description) {
        return productRepository.findAll().stream()
            .filter(product -> product.getProductDescription().toLowerCase().contains(description.toLowerCase()))
            .toList();
    }
    public List<Product> getProductsByRating(double rating) {
        return productRepository.findAll().stream()
            .filter(product -> product.getReviews() != null && product.getReviews().stream()
                .anyMatch(review -> review.getRating() >= rating))
            .toList();
    }
    public List<Product> getProductsByReviewContent(String content) {
        return productRepository.findAll().stream()
            .filter(product -> product.getReviews() != null && product.getReviews().stream()
                .anyMatch(review -> review.getContent().toLowerCase().contains(content.toLowerCase())))
            .toList();
    }
    public List<Product> getProductsByUserId(String userId) {
        return productRepository.findAll().stream()
            .filter(product -> product.getReviews() != null && product.getReviews().stream()
                .anyMatch(review -> review.getUser() != null && review.getUser().getUsername().equals(userId)))
            .toList();
    }
    public List<Product> getProductsByOrderId(String orderId) {
        return productRepository.findAll().stream()
            .filter(product -> product.getOrders() != null && product.getOrders().stream()
                .anyMatch(order -> order.getOrderId().equals(orderId)))
            .toList();
    }
    
}
