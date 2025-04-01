package com.rohith.student_course_management.controller;

import com.rohith.student_course_management.model.Student;
import com.rohith.student_course_management.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepo;

    public StudentController(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepo.save(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentRepo.findById(id).orElseThrow();
    }
}

