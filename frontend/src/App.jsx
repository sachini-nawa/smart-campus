import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ResourcesPage from "./pages/ResourcesPage";
import BookingsPage from "./pages/BookingsPage";
import TicketsPage from "./pages/TicketsPage";
import OAuthSuccess from "./pages/OAuthSuccess";

import ResourceCatalogue from "./components/Catalogue/ResourceCatalogue";
import ResourceModal from "./components/Catalogue/ResourceModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAdd = () => {
    setSelectedResource(null);
    setIsModalOpen(true);
  };

  const handleEdit = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Smart Campus Operations Hub</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Resources</Link>
          <Link to="/bookings" style={{ marginRight: "15px" }}>Bookings</Link>
          <Link to="/tickets" style={{ marginRight: "15px" }}>Tickets</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <ResourceCatalogue
                key={refreshTrigger}
                onAdd={handleAdd}
                onEdit={handleEdit}
              />
            }
          />

          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />

          {/* OAuth callback route */}
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Routes>

        {/* Modal (used by catalogue) */}
        <ResourceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          resource={selectedResource}
          onSave={handleSave}
        />
      </div>
    </Router>
  );
}

export default App;