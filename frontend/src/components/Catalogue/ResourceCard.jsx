import React from 'react';

const ResourceCard = ({ resource, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return '#10b981'; // Emerald
      case 'OUT_OF_SERVICE': return '#ef4444'; // Red
      default: return '#6b7280'; // Gray
    }
  };

  const getStatusBg = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return 'rgba(16, 185, 129, 0.1)';
      case 'OUT_OF_SERVICE': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  };

  return (
    <div className="resource-card">
      <div className="card-header">
        <div className="type-badge">{resource.type}</div>
        <div 
          className="status-badge" 
          style={{ 
            color: getStatusColor(resource.status),
            backgroundColor: getStatusBg(resource.status),
            border: `1px solid ${getStatusColor(resource.status)}`
          }}
        >
          {resource.status}
        </div>
      </div>
      
      <div className="card-body">
        <h3>{resource.name}</h3>
        <div className="info-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>{resource.location}</span>
        </div>
        <div className="info-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span>Capacity: {resource.capacity}</span>
        </div>
        <div className="info-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>{resource.availabilityWindows || 'N/A'}</span>
        </div>
      </div>

      <div className="card-footer">
        <button className="btn-edit" onClick={() => onEdit(resource)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(resource.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
