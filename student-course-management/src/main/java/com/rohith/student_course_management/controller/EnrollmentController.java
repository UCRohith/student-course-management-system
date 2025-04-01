package com.rohith.student_course_management.controller;

import com.rohith.student_course_management.model.Course;
import com.rohith.student_course_management.model.Enrollment;
import com.rohith.student_course_management.model.Student;
import com.rohith.student_course_management.repository.CourseRepository;
import com.rohith.student_course_management.repository.EnrollmentRepository;
import com.rohith.student_course_management.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepo;
    private final StudentRepository studentRepo;
    private final CourseRepository courseRepo;

    public EnrollmentController(EnrollmentRepository enrollmentRepo, StudentRepository studentRepo, CourseRepository courseRepo) {
        this.enrollmentRepo = enrollmentRepo;
        this.studentRepo = studentRepo;
        this.courseRepo = courseRepo;
    }

    @PostMapping
    public Enrollment enrollStudent(@RequestParam Long studentId, @RequestParam Long courseId) {
        Student student = studentRepo.findById(studentId).orElseThrow();
        Course course = courseRepo.findById(courseId).orElseThrow();
        return enrollmentRepo.save(new Enrollment(student, course));
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }
}
