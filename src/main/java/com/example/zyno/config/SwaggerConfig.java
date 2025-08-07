package com.example.zyno.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Zyno API",
        version = "1.0",
        description = "API documentation for Zyno application"
    )
)
public class SwaggerConfig {
    
}
