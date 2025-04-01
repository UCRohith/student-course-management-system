const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

const API_BASE = 'http://localhost:8081/api/students';

// Fetch and display students
async function loadStudents() {
  const res = await fetch(API_BASE);
  const students = await res.json();
  studentList.innerHTML = '';
  students.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name} (${s.email})`;
    studentList.appendChild(li);
  });
}

// Handle form submission
studentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  studentForm.reset();
  loadStudents();
});

loadStudents();
