package com.sliit.smartcampus.controller;

import com.sliit.smartcampus.entity.Resource;
import com.sliit.smartcampus.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping("/api/resources")
    public List<Resource> getAllResources() {
        return resourceService.getAllResources();
    }

    @GetMapping("/api/resources/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        return resourceService.getResourceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/admin/resources")
    public Resource createResource(@RequestBody Resource resource) {
        return resourceService.saveResource(resource);
    }

    @PutMapping("/api/admin/resources/{id}")
    public ResponseEntity<Resource> updateResource(@PathVariable Long id, @RequestBody Resource resource) {
        return ResponseEntity.ok(resourceService.updateResource(id, resource));
    }

    @DeleteMapping("/api/admin/resources/{id}")
    public ResponseEntity<String> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok("Resource deleted successfully");
    }
}