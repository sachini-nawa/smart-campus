package com.sliit.smartcampus.controller;

import com.sliit.smartcampus.entity.Booking;
import com.sliit.smartcampus.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/api/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PostMapping("/api/bookings")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @PutMapping("/api/admin/bookings/{id}/approve")
    public Booking approveBooking(@PathVariable Long id) {
        return bookingService.approveBooking(id);
    }

    @PutMapping("/api/admin/bookings/{id}/reject")
    public Booking rejectBooking(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return bookingService.rejectBooking(id, body.get("reason"));
    }

    @PutMapping("/api/bookings/{id}/cancel")
    public Booking cancelBooking(@PathVariable Long id) {
        return bookingService.cancelBooking(id);
    }
}