package com.bangkoklab.FollowHandy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class FollowHandyApplication {

	public static void main(String[] args) {
		SpringApplication.run(FollowHandyApplication.class, args);
	}

}
