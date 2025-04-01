const courseForm = document.getElementById("courseForm");
const courseList = document.getElementById("courseList");

function fetchCourses() {
  fetch("/api/courses")
    .then((res) => res.json())
    .then((data) => {
      courseList.innerHTML = "";
      data.forEach((course) => {
        const li = document.createElement("li");
        li.textContent = `${course.name} - ${course.description}`;
        courseList.appendChild(li);
      });
    });
}

courseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  fetch("/api/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  })
    .then((res) => {
      if (res.ok) {
        fetchCourses();
        courseForm.reset();
      }
    });
});

window.onload = () => {
  fetchCourses();
  fetchStudents();
  loadStudentsForDropdown();
  loadCoursesForDropdown();
  loadEnrollments();
};

const studentApiUrl = 'http://localhost:8081/api/students';

function fetchStudents() {
    fetch(studentApiUrl)
        .then(response => response.json())
        .then(data => {
            const studentList = document.getElementById('studentList');
            studentList.innerHTML = '';
            data.forEach(student => {
                const li = document.createElement('li');
                li.textContent = `${student.name} - ${student.email}`;
                studentList.appendChild(li);
            });
        });
}

function addStudent() {
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;

    if (!name || !email) {
        alert('Please enter both name and email.');
        return;
    }

    fetch(studentApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    })
    .then(() => {
        document.getElementById('studentName').value = '';
        document.getElementById('studentEmail').value = '';
        fetchStudents();
    });
}
fetchStudents();
const enrollmentApi = "http://localhost:8081/api/enrollments";

function loadStudentsForDropdown() {
  fetch(studentApiUrl)
    .then(res => res.json())
    .then(data => {
      const studentSelect = document.getElementById("studentSelect");
      studentSelect.innerHTML = '<option disabled selected>Choose a student</option>';
      data.forEach(s => {
        const option = document.createElement("option");
        option.value = s.id;
        option.textContent = `${s.name} (${s.email})`;
        studentSelect.appendChild(option);
      });
    });
}

function loadCoursesForDropdown() {
  fetch("/api/courses")
    .then(res => res.json())
    .then(data => {
      const courseSelect = document.getElementById("courseSelect");
      courseSelect.innerHTML = '<option disabled selected>Choose a course</option>';
      data.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = `${c.name}`;
        courseSelect.appendChild(option);
      });
    });
}

function enrollStudent() {
  const studentId = document.getElementById("studentSelect").value;
  const courseId = document.getElementById("courseSelect").value;

  if (!studentId || !courseId) {
    alert("Please select both a student and a course.");
    return;
  }

  fetch(`${enrollmentApi}?studentId=${studentId}&courseId=${courseId}`, {
    method: "POST"
  }).then(() => {
    loadEnrollments();
  });
}

function loadEnrollments() {
  fetch(enrollmentApi)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("enrollmentList");
      list.innerHTML = "";
      data.forEach(e => {
        const li = document.createElement("li");
        li.textContent = `${e.student.name} enrolled in ${e.course.name}`;
        list.appendChild(li);
      });
    });
}

