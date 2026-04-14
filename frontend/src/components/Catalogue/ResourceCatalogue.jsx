import React, { useState, useEffect } from 'react';
import resourceService from '../../services/resourceService';
import ResourceCard from './ResourceCard';
import './Catalogue.css';

const ResourceCatalogue = ({ onAdd, onEdit }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    minCapacity: '',
    status: ''
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await resourceService.getAllResources();
      setResources(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch resources. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const searchFilters = {
        ...filters,
        minCapacity: filters.minCapacity ? parseInt(filters.minCapacity) : null
      };
      const data = await resourceService.searchResources(searchFilters);
      setResources(data);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceService.deleteResource(id);
        setResources(resources.filter(r => r.id !== id));
      } catch (err) {
        alert('Failed to delete resource.');
      }
    }
  };

  const clearFilters = () => {
    setFilters({ type: '', location: '', minCapacity: '', status: '' });
    fetchResources();
  };

  return (
    <div className="catalogue-container">
      <div className="catalogue-header">
        <div>
          <h1>Facilities Catalogue</h1>
          <p>Manage and monitor all campus resources in one place.</p>
        </div>
        <button className="btn-add-primary" onClick={onAdd}>
          + Add Resource
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Resources</span>
          <span className="stat-value">{resources.length}</span>
        </div>
        <div className="stat-card active-border">
          <span className="stat-label">Active</span>
          <span className="stat-value">{resources.filter(r => r.status === 'ACTIVE').length}</span>
        </div>
        <div className="stat-card warning-border">
          <span className="stat-label">Out of Service</span>
          <span className="stat-value">{resources.filter(r => r.status === 'OUT_OF_SERVICE').length}</span>
        </div>
      </div>

      <form className="search-section" onSubmit={handleSearch}>
        <div className="search-grid">
          <div className="input-group">
            <label>Type</label>
            <select 
              value={filters.type} 
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="LECTURE_HALL">Lecture Hall</option>
              <option value="LAB">Lab</option>
              <option value="MEETING_ROOM">Meeting Room</option>
              <option value="EQUIPMENT">Equipment</option>
            </select>
          </div>
          <div className="input-group">
            <label>Location</label>
            <input 
              type="text" 
              placeholder="e.g. Block A" 
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
          </div>
          <div className="input-group">
            <label>Min Capacity</label>
            <input 
              type="number" 
              placeholder="0" 
              value={filters.minCapacity}
              onChange={(e) => setFilters({...filters, minCapacity: e.target.value})}
            />
          </div>
          <div className="input-group">
            <label>Status</label>
            <select 
              value={filters.status} 
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="OUT_OF_SERVICE">Out of Service</option>
            </select>
          </div>
        </div>
        <div className="search-actions">
          <button type="submit" className="btn-search">Search Resources</button>
          <button type="button" className="btn-clear" onClick={clearFilters}>Clear</button>
        </div>
      </form>

      {loading ? (
        <div className="loader">Loading resources...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="resource-grid">
          {resources.length > 0 ? (
            resources.map(resource => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                onEdit={onEdit} 
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="no-results">No resources found matching your criteria.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceCatalogue;
