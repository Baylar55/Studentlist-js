const addStudentBtn = document.getElementById("add");
const tableBody = document.getElementById("table-body");
const studentList = [];
let editId;
let iseditMode=false;
let inputName = document.querySelector("#name");
let inputSurname = document.querySelector("#surname");
let inputBirthday = document.querySelector("#birthday");
let inputAge = document.querySelector("#age");
let inputGender = document.querySelector("#genderM").checked ? "M" : "F";

function generateId() {
  return Math.floor(Math.random() * 1000);
}

function isDataValid(student) {
  // if(Boolean(student.name) && Boolean(student.surname) && Boolean(student.birthday) && Boolean(student.age)) {
  //     return true
  // } else {
  //     return false
  // }

  return (
    Boolean(student.name) &&
    Boolean(student.surname) &&
    Boolean(student.birthday) &&
    Boolean(student.age)
  );
}

function renderStudentList() {
  tableBody.innerHTML = "";
  studentList.map((student) => {
    const studentRow = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.surname}</td>
                <td>${student.birthday}</td>
                <td>${student.age}</td>
                <td>${student.gender === "M" ? "Male" : "Female"}</td>
                <td>
                    <img id="delete" src="./icons/delete.svg" alt="delete" onclick="deleteStudent(${student.id})">
                    <img id="edit" src="./icons/edit.svg" alt="edit" onclick='editStudent("${student.id}", "${student.name}", "${student.surname}", "${student.birthday}", "${student.age}", "${student.gender}")'>
                </td>
            </tr>
        `;
    tableBody.insertAdjacentHTML("beforeend", studentRow);
  });
}

addStudentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newStudent = {
    id: generateId(),
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    birthday: document.getElementById("birthday").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("genderM").checked ? "M" : "F",
  };
  if (isDataValid(newStudent)) {
    if (!(iseditMode)) {
      studentList.push(newStudent);
    }
    else{
        for (let student of studentList) {
          if (student.id==editId) {
            student.name=inputName.value;
            student.surname=inputSurname.value;
            student.birthday=inputBirthday.value;
            student.age=inputAge.value;
            student.gender=inputGender.value;
          }
          iseditMode=false;
        }
    }
    document.getElementById("student-form").reset();
    renderStudentList();
  } else {
    console.log("PLEASE FILL THE DATA");
  }
});

function deleteStudent(stId) {
  //let deletedID;
  // for (let index in studentList) {
  //   if (studentList[index].id==stId) {
  //     deletedID=index;
  //   }
  // }
  let deletedID= studentList.findIndex(student=>student.id==stId);
  studentList.splice(studentList.findIndex(student=>student.id==stId),1);
  renderStudentList();
}

function editStudent(stId, stName, stSurname, stBirthday, stAge, stGender) {
  editId=stId;
  iseditMode=true;
  inputName.value=stName;
  inputSurname.value=stSurname;
  inputBirthday.value=stBirthday;
  inputAge.value=stAge;
  inputGender.value=stGender; 
}