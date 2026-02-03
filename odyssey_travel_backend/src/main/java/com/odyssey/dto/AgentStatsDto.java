package com.odyssey.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AgentStatsDto {
    private long totalPackages;
    private long activeBookings;
    private long pendingApprovals;
    private double totalEarnings;
    private java.util.List<MonthlyTrendDto> monthlyTrend;
}
