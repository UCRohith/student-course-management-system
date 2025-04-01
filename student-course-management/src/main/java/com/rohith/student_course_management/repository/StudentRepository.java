package com.rohith.student_course_management.repository;

import com.rohith.student_course_management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
