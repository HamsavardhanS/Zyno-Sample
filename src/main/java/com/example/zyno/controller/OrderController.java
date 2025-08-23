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
import org.springframework.web.bind.annotation.RestController;

import com.example.zyno.model.Order;
import com.example.zyno.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id);
    }
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable String userId) {
        return orderService.getOrdersByUserId(userId);
    }
    @PostMapping("/save")
    public Order saveOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }
    @PutMapping("/update/{id}")
    public Order updateOrder(@RequestBody Order order,@PathVariable String id) {
        return orderService.updateOrder(order, id);
    }
    @GetMapping("/product/{productId}")
    public List<Order> getOrdersByProductId(@PathVariable String productId) {
        return orderService.getOrdersByProductId(productId);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
    }
}
