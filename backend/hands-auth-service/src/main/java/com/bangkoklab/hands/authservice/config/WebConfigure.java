package com.bangkoklab.hands.authservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
* @packageName com.bangkoklab.hands.authservice.config
* @fileName WebConfigure
* @author parkjaehyun
* @description web base configure
**/
@Configuration
public class WebConfigure implements WebMvcConfigurer {
    /*
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*");
    }*/
}
