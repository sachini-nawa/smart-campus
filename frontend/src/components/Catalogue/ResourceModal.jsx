import React, { useState, useEffect } from 'react';
import resourceService from '../../services/resourceService';

const ResourceModal = ({ isOpen, onClose, resource, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'LECTURE_HALL',
    capacity: '',
    location: '',
    availabilityWindows: '',
    status: 'ACTIVE'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (resource) {
      setFormData(resource);
    } else {
      setFormData({
        name: '',
        type: 'LECTURE_HALL',
        capacity: '',
        location: '',
        availabilityWindows: '',
        status: 'ACTIVE'
      });
    }
  }, [resource, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'capacity' ? parseInt(value) || '' : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (resource) {
        await resourceService.updateResource(resource.id, formData);
      } else {
        await resourceService.createResource(formData);
      }
      onSave(); // Refresh the list
      onClose(); // Close modal
    } catch (err) {
      alert('Failed to save resource. Please check your data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{resource ? 'Edit Resource' : 'Add New Resource'}</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Resource Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Computing Lab 01"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="LECTURE_HALL">Lecture Hall</option>
                <option value="LAB">Lab</option>
                <option value="MEETING_ROOM">Meeting Room</option>
                <option value="EQUIPMENT">Equipment</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input 
                type="number" 
                name="capacity" 
                value={formData.capacity} 
                onChange={handleChange} 
                required 
                placeholder="e.g. 50"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Block A, 2nd Floor"
            />
          </div>

          <div className="form-group">
            <label>Availability Windows</label>
            <input 
              type="text" 
              name="availabilityWindows" 
              value={formData.availabilityWindows} 
              onChange={handleChange} 
              placeholder="e.g. Mon-Fri: 08:00-18:00"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="ACTIVE">Active</option>
              <option value="OUT_OF_SERVICE">Out of Service</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (resource ? 'Update Resource' : 'Add Resource')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceModal;
