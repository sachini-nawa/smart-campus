package com.smartcampus.backend.controller;

import com.smartcampus.backend.entity.Resource;
import com.smartcampus.backend.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResourceController {

    private final ResourceService resourceService;

    // CREATE
    @PostMapping
    public ResponseEntity<Resource> createResource(@RequestBody Resource resource) {
        return new ResponseEntity<>(
                resourceService.saveResource(resource),
                HttpStatus.CREATED
        );
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        Optional<Resource> resource = resourceService.getResourceById(id);
        return resource.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // SEARCH
    @GetMapping("/search")
    public ResponseEntity<List<Resource>> searchResources(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String status
    ) {
        List<Resource> results = resourceService.getAllResources().stream()
                .filter(r -> type == null || r.getType().equalsIgnoreCase(type))
                .filter(r -> minCapacity == null || r.getCapacity() >= minCapacity)
                .filter(r -> location == null || r.getLocation().toLowerCase().contains(location.toLowerCase()))
                .filter(r -> status == null || r.getStatus().equalsIgnoreCase(status))
                .toList();

        return ResponseEntity.ok(results);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(
            @PathVariable Long id,
            @RequestBody Resource newData
    ) {
        Optional<Resource> existing = resourceService.getResourceById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = existing.get();
        resource.setName(newData.getName());
        resource.setType(newData.getType());
        resource.setCapacity(newData.getCapacity());
        resource.setLocation(newData.getLocation());
        resource.setStatus(newData.getStatus());
        resource.setAvailabilityWindows(newData.getAvailabilityWindows());

        return ResponseEntity.ok(resourceService.saveResource(resource));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        if (resourceService.getResourceById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }
}