package com.bangkoklab.hands.apigateway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/**
* @packageName com.bangkoklab.hands.apigateway.config
* @fileName WebConfigure
* @author parkjaehyun
* @description 웹 base configure
**/
@Configuration
public class WebConfigure implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*").allowedMethods("*").allowCredentials(true).exposedHeaders("X-AUTH-TOKEN");
    }
}
