package com.sliit.smartcampus.service;

import com.sliit.smartcampus.entity.Ticket;
import com.sliit.smartcampus.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket createTicket(Ticket ticket) {
        ticket.setStatus("OPEN");
        return ticketRepository.save(ticket);
    }

    public Ticket assignTechnician(Long id, Map<String, String> body) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setAssignedTechnician(body.get("assignedTechnician"));
        return ticketRepository.save(ticket);
    }

    public Ticket updateStatus(Long id, Map<String, String> body) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (body.containsKey("status")) {
            ticket.setStatus(body.get("status"));
        }

        if (body.containsKey("resolutionNotes")) {
            ticket.setResolutionNotes(body.get("resolutionNotes"));
        }

        return ticketRepository.save(ticket);
    }
}