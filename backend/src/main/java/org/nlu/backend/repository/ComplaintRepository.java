package org.nlu.backend.repository;

import org.nlu.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByCourseId(Long courseId);
    List<Complaint> findByUserId(Long userId);
}

