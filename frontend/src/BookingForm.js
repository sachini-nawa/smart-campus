import React, { useState } from "react";
import axios from "axios";
import "./BookingForm.css";


function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    email: "",
    resource: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    attendees: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Booking Successful ✅\n" +
      "Name: " + form.name + "\n" +
      "Resource: " + form.resource
    );

    console.log("Booking Data:", form);
  };

  return (
    <div className="page">
      <div className="card">

        <h1 className="title">🏫 SmartCampus Booking System</h1>
        <p className="subtitle">Book your resources easily and efficiently</p>

        <form onSubmit={handleSubmit} className="form">

          {/* WHO */}
          <h3>👤 Who is booking</h3>

          <div className="grid">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              name="studentId"
              placeholder="Student ID"
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          {/* WHAT */}
          <h3>🏢 What is being booked</h3>

          <select name="resource" onChange={handleChange} required>
            <option value="">Select Resource</option>
            <option>Lecture Hall</option>
            <option>Computer Lab</option>
            <option>Meeting Room</option>
            <option>Auditorium</option>
          </select>

          {/* WHEN */}
          <h3>📅 When</h3>

          <input type="date" name="date" onChange={handleChange} required />

          <div className="grid">
            <input type="time" name="startTime" onChange={handleChange} required />
            <input type="time" name="endTime" onChange={handleChange} required />
          </div>

          {/* PURPOSE */}
          <h3>🎯 Purpose</h3>

          <textarea
            name="purpose"
            placeholder="Why are you booking this resource?"
            onChange={handleChange}
            required
          />

          {/* ATTENDEES */}
          <h3>👥 Attendees</h3>

          <input
            type="number"
            name="attendees"
            placeholder="Number of people"
            onChange={handleChange}
            required
          />

          {/* BUTTON */}
          <button type="submit">📌 Book Now</button>

        </form>
      </div>
    </div>
  );
}

export default BookingForm;