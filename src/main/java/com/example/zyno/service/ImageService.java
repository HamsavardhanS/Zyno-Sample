package com.example.zyno.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.zyno.model.Image;
import com.example.zyno.model.Product;
import com.example.zyno.model.Review;
import com.example.zyno.model.User;
import com.example.zyno.repository.ImageRepository;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    public Long saveImage(byte[] data, String fileName, String contentType, Product product) {
        Image image = new Image();
        image.setData(data);
        image.setFileName(fileName);
        image.setContentType(contentType);
        image.setProduct(product); // can be null if not linked yet
        Image saved = imageRepository.save(image);
        return saved.getId();
    }

    public Image getImageById(Long id) {
        return imageRepository.findById(id).orElse(null);
    }

    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }

    public Image updateImage(Image image, Long id) {
        return imageRepository.findById(id)
            .map(existingImage -> {
                existingImage.setData(image.getData());
                existingImage.setFileName(image.getFileName());
                existingImage.setContentType(image.getContentType());
                existingImage.setProduct(image.getProduct());
                return imageRepository.save(existingImage);
            })
            .orElse(null);
    }
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public List<Image> getImagesByProduct(Product product) {
        return imageRepository.findAll().stream()
            .filter(image -> image.getProduct() != null && image.getProduct().equals(product))
            .toList();
    }
    public List<Image> getImagesByContentType(String contentType) {
        return imageRepository.findAll().stream()
            .filter(image -> contentType.equals(image.getContentType()))
            .toList();
    }
    public List<Image> getImagesByFileName(String fileName) {
        return imageRepository.findAll().stream()
            .filter(image -> fileName.equals(image.getFileName()))
            .toList();
    }
    public List<Image> getImagesByData(byte[] data) {
        return imageRepository.findAll().stream()
            .filter(image -> java.util.Arrays.equals(data, image.getData()))
            .toList();
    }
    public List<Image> getImagesByProductId(String productId) {
        return imageRepository.findAll().stream()
            .filter(image -> image.getProduct() != null && productId.equals(image.getProduct().getProductId()))
            .toList();
    }
    public List<Image> getImagesByProductName(String productName) {
        return imageRepository.findAll().stream()
            .filter(image -> image.getProduct() != null && productName.equals(image.getProduct().getProductName()))
            .toList();
    }
    public List<Image> getImagesByProductDescription(String productDescription) {
        return imageRepository.findAll().stream()
            .filter(image -> image.getProduct() != null && productDescription.equals(image.getProduct().getProductDescription()))
            .toList();
    }
    public List<Image> getImagesByProductCategory(String category) {
        return imageRepository.findAll().stream()
            .filter(image -> image.getProduct() != null && category.equals(image.getProduct().getCategory()))
            .toList();
    }
    public List<Image> getImagesByProductPrice(double price) {
        return imageRepository.findAll().stream()
            .filter(image -> image.getProduct() != null && price == image.getProduct().getPrice())
            .toList();
    }
    public List<Image> getImagesByProductStockQuantity(int stockQuantity) {
        return imageRepository.findAll().stream()
            .filter(image -> image.getProduct() != null && stockQuantity == image.getProduct().getStockQuantity())
            .toList();
    }
    public List<Image> getImagesByProductReviews(List<Review> reviews) {
        return imageRepository.findAll().stream()
            .filter(image -> image.getProduct() != null && reviews.equals(image.getProduct().getReviews()))
            .toList();
    }

}
