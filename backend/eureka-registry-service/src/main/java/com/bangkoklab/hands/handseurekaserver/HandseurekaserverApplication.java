package com.bangkoklab.hands.handseurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class HandseurekaserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(HandseurekaserverApplication.class, args);
    }

}
