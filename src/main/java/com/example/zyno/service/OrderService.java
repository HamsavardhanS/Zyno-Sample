package com.example.zyno.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.zyno.model.Order;
import com.example.zyno.repository.OrderRepository;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElse(null);
    }
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
    public Order updateOrder(Order order, String id) {
        return orderRepository.findById(id)
            .map(existingOrder -> {
                existingOrder.setOrderDate(order.getOrderDate());
                existingOrder.setTotalAmount(order.getTotalAmount());
                existingOrder.setUser(order.getUser());
                existingOrder.setProducts(order.getProducts());
                return orderRepository.save(existingOrder);
            })
            .orElse(null);
    }
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findAll().stream()
            .filter(order -> order.getUser() != null && order.getUser().getUsername().equals(userId))
            .toList();
    }
    public List<Order> getOrdersByProductId(String productId) {
        return orderRepository.findAll().stream()
            .filter(order -> order.getProducts() != null && order.getProducts().stream()
                .anyMatch(product -> product.getProductId().equals(productId)))
            .toList();
    }
}
