import { useEffect, useState } from "react";
import axios from "axios";
import "./TicketsPage.css";

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    regNo: "",
    faculty: "",
    contact: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  // MESSAGE FUNCTION
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // READ
  const fetchTickets = async () => {
    const res = await axios.get("http://localhost:8080/api/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDATION
  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.email.includes("@")) err.email = "Valid email required";
    if (!form.contact.match(/^[0-9]{10}$/))
      err.contact = "Contact must be 10 digits";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // CREATE + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      showMessage("Please fix validation errors ❌", "error");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/tickets/${editId}`, form);
        showMessage("Ticket updated successfully ✅", "success");
        setEditId(null);
      } else {
        await axios.post("http://localhost:8080/api/tickets", form);
        showMessage("Ticket created successfully 🎉", "success");
      }

      setForm({
        name: "",
        email: "",
        category: "",
        regNo: "",
        faculty: "",
        contact: "",
        description: ""
      });

      fetchTickets();
    } catch (error) {
      showMessage("Server error ❌", "error");
    }
  };

  // EDIT
  const handleEdit = (t) => {
    setForm(t);
    setEditId(t.id);
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/tickets/${id}`);
    showMessage("Ticket deleted 🗑️", "success");
    fetchTickets();
  };

  return (
    <div className="ticket-page">

      <h2 className="page-title">🎫 Ticket Management System</h2>

      {/* MESSAGE */}
      {message && (
        <div className={messageType === "success" ? "msg-success" : "msg-error"}>
          {message}
        </div>
      )}

      <div className="ticket-container">

        {/* FORM */}
        <div className="ticket-form-card">

          <h3>{editId ? "Update Ticket" : "Create Ticket"}</h3>

          <form onSubmit={handleSubmit} className="ticket-form">

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <small>{errors.name}</small>

            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <small>{errors.email}</small>

            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
            <input name="regNo" placeholder="Registration Number" value={form.regNo} onChange={handleChange} />
            <input name="faculty" placeholder="Faculty" value={form.faculty} onChange={handleChange} />

            <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
            <small>{errors.contact}</small>

            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

            <button className="btn-primary">
              {editId ? "Update Ticket" : "Create Ticket"}
            </button>

          </form>
        </div>
      </div>

      {/* TABLE */}
      <div style={{ width: "100%", maxWidth: "1100px", marginTop: "30px" }}>

        <table className="ticket-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Reg No</th>
              <th>Faculty</th>
              <th>Contact</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.category}</td>
                <td>{t.regNo}</td>
                <td>{t.faculty}</td>
                <td>{t.contact}</td>
                <td>{t.description}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(t)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TicketsPage;