package com.sliit.smartcampus.entity;

import com.sliit.smartcampus.enums.ResourceStatus;
import com.sliit.smartcampus.enums.ResourceType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private ResourceType type;

    private Integer capacity;

    private String location;

    private String availabilityWindow;

    @Enumerated(EnumType.STRING)
    private ResourceStatus status;
}