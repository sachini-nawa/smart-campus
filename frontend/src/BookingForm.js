import { useState } from "react";
import axios from "axios";


function BookingForm() {

  const [form, setForm] = useState({
    resourceName: "",
    date: "",
    startTime: "",
    endTime: "",
    userName: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert("Booking Submitted!");
    console.log(form);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Book a Resource</h2>

      <input
        name="resourceName"
        placeholder="Room Name"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="date"
        name="date"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="time"
        name="startTime"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="time"
        name="endTime"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="userName"
        placeholder="Your Name"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        Book Now
      </button>
    </div>
  );
}

export default BookingForm;