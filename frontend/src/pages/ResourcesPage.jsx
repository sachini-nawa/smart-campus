import { useEffect, useState } from "react";
import axios from "axios";

function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "LAB",
    capacity: "",
    location: "",
    availabilityWindow: "",
    status: "ACTIVE",
  });

  const fetchResources = async () => {
    const res = await axios.get("http://localhost:8080/api/resources");
    setResources(res.data);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/resources", {
      ...form,
      capacity: Number(form.capacity),
    });
    setForm({
      name: "",
      type: "LAB",
      capacity: "",
      location: "",
      availabilityWindow: "",
      status: "ACTIVE",
    });
    fetchResources();
  };

  return (
    <div>
      <h2>Resources</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="LAB">LAB</option>
          <option value="LECTURE_HALL">LECTURE_HALL</option>
          <option value="MEETING_ROOM">MEETING_ROOM</option>
          <option value="EQUIPMENT">EQUIPMENT</option>
        </select>
        <input
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Availability"
          value={form.availabilityWindow}
          onChange={(e) => setForm({ ...form, availabilityWindow: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
        </select>
        <button type="submit">Add Resource</button>
      </form>

      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            {resource.name} - {resource.type} - {resource.location} - {resource.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourcesPage;