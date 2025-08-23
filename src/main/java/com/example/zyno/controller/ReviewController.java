package com.example.zyno.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.zyno.service.ReviewService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.zyno.model.Review;


@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }
    @GetMapping("/product/{id}")
    public List<Review> getReviewsByProductId(@PathVariable String productId) {
        return reviewService.getReviewsByProductId(productId);
    }
    @GetMapping("/user/{userId}")
    public List<Review> getReviewsByUserId(@PathVariable  String userId) {
        return reviewService.getReviewsByUserId(userId);
    }
    @GetMapping("/rating")
    public List<Review> getReviewsByRating(@RequestParam int  rating) {
        return reviewService.getReviewsByRating(rating);
    }
    @GetMapping("/content")
    public List<Review> getReviewsByContent(@RequestParam String content) {
        return reviewService.getReviewsByContent(content);
    }
    @GetMapping("/{id}")
    public Review getReviewById(@RequestParam Long id) {
        return reviewService.getReviewById(id);
    }
    @PostMapping("/save")
    public Review saveReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }
    @PutMapping("/update/{id}")
    public Review updateReview(@RequestBody Review review, @RequestParam Long id) {
        return reviewService.updateReview(review, id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteReview(@RequestParam Long id) {
        reviewService.deleteReview(id);
    }
}