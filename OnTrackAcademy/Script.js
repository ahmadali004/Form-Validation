// document.getElementById('FirstName').addEventListener('input', clearFirstNameError);
// function clearFirstNameError(){
//     document.getElementById(nameError).textContent='';

// const { json } = require("express");

// const { Button } = require("bootstrap");

// const { json } = require("express/lib/response");

// }

// function validateForm() {

//     const FirstName = document.getElementById("FirstName").value.trim();

//     const LastName = document.getElementById("LastName").value.trim();

//     const Email = document.getElementById("Email").value.trim();

//     const PassWord = document.getElementById("PassWord").value.trim();

//     const Male = document.getElementById("Male").checked;

//     const Female = document.getElementById("Female").checked;

//     const Course = document.getElementById("Course").value;

//     const Terms = document.getElementById("terms").checked;

//     const nameError = document.getElementById("name-error");

//     const lastnameError = document.getElementById("lastname-error");

//     const emailError = document.getElementById("email-error");

//     const passwordError = document.getElementById("password-error");

//     const genderError = document.getElementById("gender-error");

//     const courseError = document.getElementById("course-error");

//     const termsError = document.getElementById("terms-error");

//     nameError.textContent = "";

//     lastnameError.textContent = "";

//     emailError.textContent = "";

//     passwordError.textContent = "";

//     genderError.textContent = "";

//     courseError.textContent = "";

//     termsError.textContent = "";

//     let isValid = true;

//     //at least 5 charachers at most 50
//     if (FirstName==="") {
//         nameError.textContent = "Enter First Name correctly";
//         isValid = false;
//     }

// //at least 5 charachers at most 50
//     if (LastName === "") {
//         lastnameError.textContent = "Enter Last Name correctly";
//         isValid = false;
//     }

// // check the email is valide that means it has a fromat name@company.someting
//     if (Email === "") {
//         emailError.textContent = "Enter Email correctly";
//         isValid = false;
//     }
// //should only enable strong passowrd (regular expression )
//     if (PassWord === "") {
//         passwordError.textContent = "Enter Password correctly";
//         isValid = false;
//     }

//     if (!Male && !Female) {
//         genderError.textContent = "Select gender";
//         isValid = false;
//     }

//     //Name rule
//     if (Course === "") {
//         courseError.textContent = "Select a course";
//         isValid = false;
//     }

//     if (!Terms) {
//         termsError.textContent = "Please agree to terms and conditions";
//         isValid = false;
//     }

//     return isValid;
// }
$(document).ready(function () {
  loadStudents();
  console.log("logged");
  $("#studentForm").on("submit", function (event) {
    event.preventDefault();
    loadStudents();
    const editIndex = $("#studentForm").data("editIndex");
    if (editIndex !== undefined) {
      updateStudent(editIndex);
    } else {
      saveStudent();
    }
    loadStudents();
  });
});

function saveStudent() {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  const student = {
    firstName: $("#FirstName").val(),
    lastName: $("#LastName").val(),
    gender: $('input[name="gender"]:checked').val(),
    parentName: $("#Parent").val(),
    className: $("#Class").val(),
  };
  console.log("logged");

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  alert("Student saved successfully!");
  $("#studentForm")[0].reset();
}

function loadStudents() {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  let studentTableBody = $("#UserTableBody");
  studentTableBody.empty();
  students.forEach((student, index) => {
    let row = `<tr>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.gender}</td>
      <td>${student.parentName}</td>
      <td>${student.className}</td>
      <td><button class="btn btn-primary btn-sm" onclick="editStudent(${index})">Edit</button></td>
      </tr>`;

    studentTableBody.append(row);
  });
}

function editStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[index];

  $("#FirstName").val(student.firstName);
  $("#LastName").val(student.lastName);
  $(`input[name="gender"][value="${student.gender}"]`).prop("checked", true);
  $("#Parent").val(student.parentName);
  $("#Class").val(student.className);
  $("#studentForm").data("editIndex", index);
}

function updateStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  students[index].firstName = $("#FirstName").val();
  students[index].lastName = $("#LastName").val();
  students[index].gender = $('input[name="gender"]:checked').val();
  students[index].parentName = $("#Parent").val();
  students[index].className = $("#Class").val();

  localStorage.setItem("students", JSON.stringify(students));
  alert("Student updated successfully!");
  $("#studentForm")[0].reset();
  $("#studentForm").removeData("editIndex");
}

function goto(page) {
  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("main-content").innerHTML = html;

      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });

      element.classList.add("active");
    });
}

//Parent save

$(document).ready(function () {
  loadParents();

  $("#parentForm").on("submit", function (event) {
    event.preventDefault();
    const editIndex = $("#parentForm").data("editIndex");
    if (editIndex !== undefined) {
      updateParent(editIndex);
    } else {
      saveParent();
    }
    loadParents();
  });
});

function saveParent() {
  let parents = JSON.parse(localStorage.getItem("parents")) || [];

  const parent = {
    firstName: $("#FirstName").val(),
    lastName: $("#LastName").val(),
    workplace: $("#Workplace").val(),
    jobTitle: $("#JobTitle").val(),
    address: $("#Address").val(),
    dob: $("#DOB").val(),
  };

  parents.push(parent);
  localStorage.setItem("parents", JSON.stringify(parents));
  alert("Parent saved successfully!");
  $("#parentForm")[0].reset();
}

function loadParents() {
  let parents = JSON.parse(localStorage.getItem("parents")) || [];
  let parentTableBody = $("#ParentTableBody");
  parentTableBody.empty();
  parents.forEach((parent, index) => {
    let row = `<tr>
      <td>${parent.firstName}</td>
      <td>${parent.lastName}</td>
      <td>${parent.workplace}</td>
      <td>${parent.jobTitle}</td>
      <td>${parent.address}</td>
      <td>${parent.dob}</td>
      <td><button class="btn btn-primary btn-sm" onclick="editParent(${index})">Edit</button></td>
    </tr>`;

    parentTableBody.append(row);
  });
}

function editParent(index) {
  let parents = JSON.parse(localStorage.getItem("parents")) || [];
  const parent = parents[index];

  $("#FirstName").val(parent.firstName);
  $("#LastName").val(parent.lastName);
  $("#Workplace").val(parent.workplace);
  $("#JobTitle").val(parent.jobTitle);
  $("#Address").val(parent.address);
  $("#DOB").val(parent.dob);
  $("#parentForm").data("editIndex", index);
}

function updateParent(index) {
  let parents = JSON.parse(localStorage.getItem("parents")) || [];

  parents[index].firstName = $("#FirstName").val();
  parents[index].lastName = $("#LastName").val();
  parents[index].workplace = $("#Workplace").val();
  parents[index].jobTitle = $("#JobTitle").val();
  parents[index].address = $("#Address").val();
  parents[index].dob = $("#DOB").val();

  localStorage.setItem("parents", JSON.stringify(parents));
  alert("Parent updated successfully!");
  $("#parentForm")[0].reset();
  $("#parentForm").removeData("editIndex");
}


//save tecaher

$(document).ready(function () {
  loadTeachers();

  $("#teacherForm").on("submit", function (event) {
    event.preventDefault();
    const editIndex = $("#teacherForm").data("editIndex");
    if (editIndex !== undefined) {
      updateTeacher(editIndex);
    } else {
      saveTeacher();
    }
    loadTeachers();
  });
});

function saveTeacher() {
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  const teacher = {
    firstName: $("#FirstName").val(),
    lastName: $("#LastName").val(),
    department: $("#Department").val(),
    jobTitle: $("#JobTitle").val(),
    email: $("#Email").val(),
    dob: $("#DOB").val(),
  };

  teachers.push(teacher);
  localStorage.setItem("teachers", JSON.stringify(teachers));
  alert("Teacher saved successfully!");
  $("#teacherForm")[0].reset();
}

function loadTeachers() {
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  let teacherTableBody = $("#TeacherTableBody");
  teacherTableBody.empty();
  teachers.forEach((teacher, index) => {
    let row = `<tr>
      <td>${teacher.firstName}</td>
      <td>${teacher.lastName}</td>
      <td>${teacher.department}</td>
      <td>${teacher.jobTitle}</td>
      <td>${teacher.email}</td>
      <td>${teacher.dob}</td>
      <td><button class="btn btn-primary btn-sm" onclick="editTeacher(${index})">Edit</button></td>
    </tr>`;

    teacherTableBody.append(row);
  });
}

function editTeacher(index) {
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  const teacher = teachers[index];

  $("#FirstName").val(teacher.firstName);
  $("#LastName").val(teacher.lastName);
  $("#Department").val(teacher.department);
  $("#JobTitle").val(teacher.jobTitle);
  $("#Email").val(teacher.email);
  $("#DOB").val(teacher.dob);
  $("#teacherForm").data("editIndex", index);
}

function updateTeacher(index) {
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  teachers[index].firstName = $("#FirstName").val();
  teachers[index].lastName = $("#LastName").val();
  teachers[index].department = $("#Department").val();
  teachers[index].jobTitle = $("#JobTitle").val();
  teachers[index].email = $("#Email").val();
  teachers[index].dob = $("#DOB").val();

  localStorage.setItem("teachers", JSON.stringify(teachers));
  alert("Teacher updated successfully!");
  $("#teacherForm")[0].reset();
  $("#teacherForm").removeData("editIndex");
}