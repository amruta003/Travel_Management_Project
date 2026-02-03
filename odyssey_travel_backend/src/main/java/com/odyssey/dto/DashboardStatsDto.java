package com.odyssey.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private double totalRevenue;
    private long totalBookings;
    private long totalCustomers;
    private long totalAgents;
    private long totalPackages;
    private long pendingApprovals;
    private java.util.List<MonthlyTrendDto> yoyData;
    private java.util.List<MonthlyTrendDto> revenueData;
}
