package com.sliit.smartcampus.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sliit.smartcampus.entity.Resource;
import com.sliit.smartcampus.repository.ResourceRepository;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Optional<Resource> getResourceById(Long id) {
        return resourceRepository.findById(id);
    }

    public Resource saveResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public Resource updateResource(Long id, Resource updatedResource) {
        return resourceRepository.findById(id).map(resource -> {
            resource.setName(updatedResource.getName());
            resource.setType(updatedResource.getType());
            resource.setCapacity(updatedResource.getCapacity());
            resource.setLocation(updatedResource.getLocation());
            resource.setAvailabilityWindow(updatedResource.getAvailabilityWindow());
            resource.setStatus(updatedResource.getStatus());
            return resourceRepository.save(resource);
        }).orElseThrow(() -> new RuntimeException("Resource not found"));
    }

    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }
}