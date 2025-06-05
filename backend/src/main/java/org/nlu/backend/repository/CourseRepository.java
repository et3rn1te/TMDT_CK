package org.nlu.backend.repository;

import org.nlu.backend.entity.Course;
import org.nlu.backend.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course> {
    List<Course> findBySeller(User seller);
}
