import React, { useState } from 'react';
import ResourceCatalogue from './components/Catalogue/ResourceCatalogue';
import ResourceModal from './components/Catalogue/ResourceModal';
import './App.css';

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
    // Trigger a refresh of the catalogue
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app-main">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-section">
            <span className="logo-icon">🏢</span>
            <span className="logo-text">SmartCampus</span>
          </div>
          <div className="nav-links">
            <a href="#" className="active">Catalogue</a>
            <a href="#">Bookings</a>
            <a href="#">Maintenance</a>
          </div>
          <div className="user-profile">
            <div className="user-avatar">AD</div>
            <span>Admin</span>
          </div>
        </div>
      </nav>

      <main className="content-area">
        <ResourceCatalogue 
          key={refreshTrigger}
          onAdd={handleAdd} 
          onEdit={handleEdit} 
        />
      </main>

      <ResourceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        resource={selectedResource}
        onSave={handleSave}
      />

      <footer className="footer">
        <p>&copy; 2026 Smart Campus Operations Hub • Member 1 - Facilities & Assets Catalogue</p>
      </footer>
    </div>
  );
}

export default App;
