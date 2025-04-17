package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class TaskManagerApplication {

	public static void main(String[] args) {
		// Heroku port setup
		String port = System.getenv("PORT"); // Heroku sets this
		if (port == null) port = "8080"; // The default port for local testing
		System.setProperty("server.port", port);

		SpringApplication.run(TaskManagerApplication.class, args);
	}
}