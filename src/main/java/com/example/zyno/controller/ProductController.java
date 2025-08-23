package com.example.zyno.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.zyno.model.Product;
import com.example.zyno.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }
    @PostMapping("/save")
    public Product saveProduct(Product product) {
        return productService.saveProduct(product);
    }
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }
    @PutMapping("/{id}")
    public Product updateProduct(@RequestBody Product product,@PathVariable String id) {
        return productService.updateProduct(product, id);
    }
    @GetMapping("/price-range")
    public List<Product> getProductsByPriceRange(@RequestParam double minPrice,@RequestParam double maxPrice) {
        return productService.getProductsByPriceRange(minPrice, maxPrice);
    }
    @GetMapping("/name/{name}")
    public List<Product> getProductsByName(@PathVariable String name) {
        return productService.getProductsByName(name);
    }
    @GetMapping("/description/{description}")
    public List<Product> getProductsByDescription(@PathVariable String description) {
        return productService.getProductsByDescription(description);
    }
    @GetMapping("/rating/{rating}")
    public List<Product> getProductsByRating(@PathVariable double rating) {
        return productService.getProductsByRating(rating);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

}
