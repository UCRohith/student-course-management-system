package com.rohith.student_course_management.repository;


import  com.rohith.student_course_management.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
