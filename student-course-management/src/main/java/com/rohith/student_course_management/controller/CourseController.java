
package com.rohith.student_course_management.controller;
import com.rohith.student_course_management.model.Course;
import com.rohith.student_course_management.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*") // allows frontend calls
public class CourseController {

    private final CourseRepository courseRepo;

    public CourseController(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseRepo.save(course);
    }
}
