package com.example.zyno.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.zyno.model.Image;
import com.example.zyno.model.Product;
import com.example.zyno.repository.ProductRepository;
import com.example.zyno.service.ImageService;

@RestController
@RequestMapping("/images")
public class ImageController {
    @Autowired
    private ImageService imageService;
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/upload")
    public ResponseEntity<Long> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "productId", required = false) String productId
    ) {
        try {
            Product product = null;
            if (productId != null) {
                product = productRepository.findById(productId).orElse(null);
            }
            Long imageId = imageService.saveImage(
                    file.getBytes(),
                    file.getOriginalFilename(),
                    file.getContentType(),
                    product
            );
            return ResponseEntity.ok(imageId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        try {
            imageService.deleteImage(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable Long id) {
        try {
            byte[] imageData = imageService.getImageById(id).getData();
            if (imageData != null) {
                return ResponseEntity.ok()
                        .header("Content-Disposition", "attachment; filename=image_" + id + ".jpg")
                        .body(imageData);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Image>> getAllImages() {
        try {
            List<Image> images = imageService.getAllImages();
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Image>> getImagesByProductId(@PathVariable String productId)
    {
        try {
            Product product = productRepository.findById(productId).orElse(null);
            if (product == null) {
                return ResponseEntity.notFound().build();
            }
            List<Image> images = imageService.getImagesByProduct(product);
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/content-type")
    public ResponseEntity<List<Image>> getImagesByContentType(@RequestParam String contentType)
    {
        try {
            List<Image> images = imageService.getImagesByContentType(contentType);
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}