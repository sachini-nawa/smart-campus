package com.sliit.smartcampus.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sliit.smartcampus.entity.Booking;
import com.sliit.smartcampus.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking createBooking(Booking booking) {
        List<Booking> existingBookings =
                bookingRepository.findByResourceIdAndBookingDate(
                        booking.getResource().getId(),
                        booking.getBookingDate()
                );

        for (Booking existing : existingBookings) {
            boolean overlap =
                    booking.getStartTime().isBefore(existing.getEndTime()) &&
                    booking.getEndTime().isAfter(existing.getStartTime());

            boolean activeBooking =
                    "PENDING".equals(existing.getStatus()) ||
                    "APPROVED".equals(existing.getStatus());

            if (overlap && activeBooking) {
                throw new RuntimeException("Booking conflict detected for this resource and time range");
            }
        }

        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }

    public Booking approveBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("APPROVED");
        return bookingRepository.save(booking);
    }

    public Booking rejectBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("REJECTED");
        booking.setRejectionReason(reason);
        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }
}