import { useEffect, useState } from "react";
import axios from "axios";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    resourceId: "",
    requestedBy: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    expectedAttendees: "",
  });

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:8080/api/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/bookings", {
      resource: { id: Number(form.resourceId) },
      requestedBy: form.requestedBy,
      bookingDate: form.bookingDate,
      startTime: form.startTime + ":00",
      endTime: form.endTime + ":00",
      purpose: form.purpose,
      expectedAttendees: Number(form.expectedAttendees),
    });
    setForm({
      resourceId: "",
      requestedBy: "",
      bookingDate: "",
      startTime: "",
      endTime: "",
      purpose: "",
      expectedAttendees: "",
    });
    fetchBookings();
  };

  return (
    <div>
      <h2>Bookings</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Resource ID"
          value={form.resourceId}
          onChange={(e) => setForm({ ...form, resourceId: e.target.value })}
        />
        <input
          placeholder="Requested By"
          value={form.requestedBy}
          onChange={(e) => setForm({ ...form, requestedBy: e.target.value })}
        />
        <input
          type="date"
          value={form.bookingDate}
          onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
        />
        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
        />
        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
        />
        <input
          placeholder="Purpose"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />
        <input
          placeholder="Expected Attendees"
          value={form.expectedAttendees}
          onChange={(e) => setForm({ ...form, expectedAttendees: e.target.value })}
        />
        <button type="submit">Create Booking</button>
      </form>

      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Resource {booking.resource?.id} - {booking.requestedBy} - {booking.bookingDate} - {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingsPage;