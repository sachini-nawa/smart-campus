import { useEffect, useState } from "react";
import axios from "axios";

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    location: "",
    category: "",
    description: "",
    priority: "",
    preferredContact: "",
  });

  const fetchTickets = async () => {
    const res = await axios.get("http://localhost:8080/api/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/tickets", form);
    setForm({
      location: "",
      category: "",
      description: "",
      priority: "",
      preferredContact: "",
    });
    fetchTickets();
  };

  return (
    <div>
      <h2>Tickets</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Priority"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        />
        <input
          placeholder="Preferred Contact"
          value={form.preferredContact}
          onChange={(e) => setForm({ ...form, preferredContact: e.target.value })}
        />
        <button type="submit">Create Ticket</button>
      </form>

      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.location} - {ticket.category} - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketsPage;