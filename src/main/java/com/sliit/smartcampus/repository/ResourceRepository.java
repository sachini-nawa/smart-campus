package com.sliit.smartcampus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sliit.smartcampus.entity.Resource;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
}