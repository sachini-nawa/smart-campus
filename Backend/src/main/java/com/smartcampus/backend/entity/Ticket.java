package com.smartcampus.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String category;
    private String regNo;
    private String faculty;
    private String contact;
    private String description;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getRegNo() { return regNo; }
    public void setRegNo(String regNo) { this.regNo = regNo; }

    public String getFaculty() { return faculty; }
    public void setFaculty(String faculty) { this.faculty = faculty; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
