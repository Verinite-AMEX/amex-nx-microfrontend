package com.onlinehelper.onlinehelper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class OnlinehelperApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlinehelperApplication.class, args);
	}

}
