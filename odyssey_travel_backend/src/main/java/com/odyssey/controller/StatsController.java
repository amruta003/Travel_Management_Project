package com.odyssey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.odyssey.dto.DashboardStatsDto;
import com.odyssey.dto.AgentStatsDto;
import com.odyssey.service.StatsService;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/admin")
    public ResponseEntity<DashboardStatsDto> getAdminStats() {
        return ResponseEntity.ok(statsService.getAdminStats());
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<AgentStatsDto> getAgentStats(@PathVariable Long agentId) {
        return ResponseEntity.ok(statsService.getAgentStats(agentId));
    }
}
