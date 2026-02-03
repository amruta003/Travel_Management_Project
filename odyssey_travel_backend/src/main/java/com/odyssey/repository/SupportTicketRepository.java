package com.odyssey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odyssey.entity.SupportTicket;

public interface SupportTicketRepository extends JpaRepository<SupportTicket , Long> {

	List<SupportTicket> findByUser_Id(Long userId);
	List<SupportTicket> findByBooking_TravelPackage_Agent_Id(Long agentId);
}
