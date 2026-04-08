import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResourcesPage from "./pages/ResourcesPage";
import BookingsPage from "./pages/BookingsPage";
import TicketsPage from "./pages/TicketsPage";
import OAuthSuccess from "./pages/OAuthSuccess";
function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Smart Campus Operations Hub</h1>

        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Resources</Link>
          <Link to="/bookings" style={{ marginRight: "15px" }}>Bookings</Link>
          <Link to="/tickets">Tickets</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ResourcesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;