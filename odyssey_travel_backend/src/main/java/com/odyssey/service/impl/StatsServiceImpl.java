package com.odyssey.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odyssey.dto.DashboardStatsDto;
import com.odyssey.dto.AgentStatsDto;
import com.odyssey.dto.MonthlyTrendDto;
import com.odyssey.entity.Role;
import com.odyssey.entity.Status;
import com.odyssey.entity.Booking;
import com.odyssey.entity.TravelPackage;
import com.odyssey.repository.BookingRepository;
import com.odyssey.repository.PaymentRepository;
import com.odyssey.repository.TravelPackageRepository;
import com.odyssey.repository.UserRepository;
import com.odyssey.service.StatsService;

import java.util.List;

@Service
public class StatsServiceImpl implements StatsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TravelPackageRepository travelPackageRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public DashboardStatsDto getAdminStats() {
        long totalCustomers = userRepository.findByRole(Role.CLIENT).size();
        long totalAgents = userRepository.findByRole(Role.AGENT).size();
        long totalPackages = travelPackageRepository.count();
        long pendingPackages = travelPackageRepository.findByStatus(Status.PENDING).size();
        
        List<Booking> allBookings = bookingRepository.findAll();
        long totalBookings = allBookings.size();
        
        double totalRevenue = allBookings.stream()
                .filter(b -> b.getPayment() != null && "PAID".equals(b.getPayment().getPaymentStatus()))
                .mapToDouble(b -> b.getPayment().getAmount())
                .sum();

        // Generate Trends (Simple last 6 months)
        List<MonthlyTrendDto> yoyData = new java.util.ArrayList<>();
        List<MonthlyTrendDto> revenueData = new java.util.ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        
        int currentMonth = java.time.LocalDate.now().getMonthValue();
        for (int i = 0; i < 6; i++) {
            int mIdx = (currentMonth - 6 + i + 12) % 12;
            String mName = months[mIdx];
            
            long mBookings = allBookings.stream()
                    .filter(b -> b.getTravelDate() != null && b.getTravelDate().getMonthValue() == (mIdx + 1))
                    .count();
            
            long mCustomers = allBookings.stream()
                    .filter(b -> b.getTravelDate() != null && b.getTravelDate().getMonthValue() == (mIdx + 1))
                    .map(b -> b.getUser().getId())
                    .distinct()
                    .count();
            
            double mRev = allBookings.stream()
                    .filter(b -> b.getTravelDate() != null && b.getTravelDate().getMonthValue() == (mIdx + 1))
                    .filter(b -> b.getPayment() != null && "PAID".equals(b.getPayment().getPaymentStatus()))
                    .mapToDouble(b -> b.getPayment().getAmount())
                    .sum();
            
            yoyData.add(new MonthlyTrendDto(mName, mBookings, mCustomers, 0));
            revenueData.add(new MonthlyTrendDto(mName, 0, 0, mRev));
        }

        return new DashboardStatsDto(totalRevenue, totalBookings, totalCustomers, totalAgents, totalPackages, pendingPackages, yoyData, revenueData);
    }

    @Override
    public AgentStatsDto getAgentStats(Long agentId) {
        List<TravelPackage> agentPackages = travelPackageRepository.findByAgent_Id(agentId);
        long totalPackages = agentPackages.size();
        long pendingApprovals = agentPackages.stream().filter(p -> p.getStatus() == Status.PENDING).count();
        
        List<Booking> agentBookings = bookingRepository.findByTravelPackage_Agent_Id(agentId);
        long activeBookings = agentBookings.size();
        
        double totalEarnings = agentBookings.stream()
                .filter(b -> b.getPayment() != null && "PAID".equals(b.getPayment().getPaymentStatus()))
                .mapToDouble(b -> b.getPayment().getAmount())
                .sum();

        // Agent Trends
        List<MonthlyTrendDto> trend = new java.util.ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        int currentMonth = java.time.LocalDate.now().getMonthValue();
        
        for (int i = 0; i < 6; i++) {
            int mIdx = (currentMonth - 6 + i + 12) % 12;
            String mName = months[mIdx];
            long count = agentBookings.stream()
                    .filter(b -> b.getTravelDate() != null && b.getTravelDate().getMonthValue() == (mIdx + 1))
                    .count();
            trend.add(new MonthlyTrendDto(mName, count, 0, 0));
        }

        return new AgentStatsDto(totalPackages, activeBookings, pendingApprovals, totalEarnings, trend);
    }
}
