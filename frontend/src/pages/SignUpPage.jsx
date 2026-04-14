import { useState } from "react";
import axios from "axios";

function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/signup",
        form
      );
      alert("Signup successful 🎉");
      console.log(res.data);
    } catch (err) {
      alert("Signup failed ❌");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="STUDENT">Student</option>
            <option value="LECTURER">Lecturer</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <button
          style={styles.googleBtn}
          onClick={() =>
            (window.location.href =
              "http://localhost:8080/oauth2/authorization/google")
          }
        >
          Continue with Google 🌐
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  googleBtn: {
    marginTop: "15px",
    padding: "10px",
    background: "#db4437",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};