package com.example.zyno.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.zyno.model.Review;
import com.example.zyno.repository.ReviewRepository;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
    public Review updateReview(Review review, Long id) {
        return reviewRepository.findById(id)
            .map(existingReview -> {
                existingReview.setRating(review.getRating());
                existingReview.setContent(review.getContent());
                return reviewRepository.save(existingReview);
            })
            .orElse(null);
    }
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
    public List<Review> getReviewsByProductId(String productId) {
        return reviewRepository.findAll().stream()
            .filter(review -> review.getProduct() != null && review.getProduct().getProductId().equals(productId))
            .toList();
    }
    public List<Review> getReviewsByUserId(String userId) {
        return reviewRepository.findAll().stream()
            .filter(review -> review.getUser() != null && review.getUser().getUsername().equals(userId))
            .toList();
    }
    public List<Review> getReviewsByRating(int  rating) {
        return reviewRepository.findAll().stream()
            .filter(review -> review.getRating() == rating)
            .toList();
    }
    public List<Review> getReviewsByContent(String content) {
        return reviewRepository.findAll().stream()
            .filter(review -> review.getContent().toLowerCase().contains(content.toLowerCase()))
            .toList();
    }

}