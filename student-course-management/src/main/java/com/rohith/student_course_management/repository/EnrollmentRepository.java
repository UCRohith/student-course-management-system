package com.rohith.student_course_management.repository;

import com.rohith.student_course_management.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
}
