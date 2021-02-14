package com.bangkoklab.findJobService;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
@MapperScan(basePackages = "com.bangkoklab.findJobService.data.mapper")
public class FindJobServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FindJobServiceApplication.class, args);
	}

}
