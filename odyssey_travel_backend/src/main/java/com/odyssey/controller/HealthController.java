package com.odyssey.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home() {
        return "Odyssey Travel Backend is LIVE 🚀";
    }

    @GetMapping("/health")
    public String health() {
        return "Application is running successfully ✅";
    }
}
