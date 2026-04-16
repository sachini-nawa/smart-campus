package com.sliit.smartcampus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sliit.smartcampus.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}