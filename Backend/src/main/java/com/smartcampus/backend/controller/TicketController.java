package com.smartcampus.backend.controller;

import com.smartcampus.backend.entity.Ticket;
import com.smartcampus.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    // CREATE ticket
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    // GET all tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
}