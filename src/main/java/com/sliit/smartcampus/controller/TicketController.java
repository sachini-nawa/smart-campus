package com.sliit.smartcampus.controller;

import com.sliit.smartcampus.entity.Ticket;
import com.sliit.smartcampus.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/api/tickets")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @PostMapping("/api/tickets")
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @PutMapping("/api/admin/tickets/{id}/assign")
    public Ticket assignTechnician(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ticketService.assignTechnician(id, body);
    }

    @PutMapping("/api/admin/tickets/{id}/status")
    public Ticket updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ticketService.updateStatus(id, body);
    }
}