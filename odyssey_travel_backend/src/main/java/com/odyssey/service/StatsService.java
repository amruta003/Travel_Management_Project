package com.odyssey.service;

import com.odyssey.dto.DashboardStatsDto;
import com.odyssey.dto.AgentStatsDto;

public interface StatsService {
    DashboardStatsDto getAdminStats();
    AgentStatsDto getAgentStats(Long agentId);
}
