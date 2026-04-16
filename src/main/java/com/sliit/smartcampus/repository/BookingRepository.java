package com.sliit.smartcampus.repository;

import com.sliit.smartcampus.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByResourceIdAndBookingDate(Long resourceId, LocalDate bookingDate);
}