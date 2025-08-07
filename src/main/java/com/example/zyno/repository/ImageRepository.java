package com.example.zyno.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.zyno.model.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
