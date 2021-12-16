
const fullname = JSON.parse(localStorage.getItem("userInfo"))
window.onload = function () {
  let listStudent = [];
  let editId = null;
  let loai = "";
  let color = "";
  const btn = document.querySelector("#submit");
  const table = document.querySelector("#tableData");
  const inputName = document.querySelector("#name");
  const inputSdt = document.querySelector("#phone");
  const inputEmail = document.querySelector("#email");
  const inputAddress = document.querySelector("#address");
  const inputDob = document.querySelector("#dob");
  const inputScore = document.querySelector("#score");
  const modal = document.querySelector('#my-modal');
  const modalBtn = document.querySelector('#modal-btn');
  const closeBtn = document.querySelector('.close');


  modalBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', outsideClick);
  
  function clearInput() {
    inputName.value = "";
    inputAddress.value = "";
    inputDob.value = "";
    inputScore.value = "";
    inputSdt.value = "";
    inputEmail.value = "";
  }


  function refreshTable() {
    table.innerHTML = "";
    for (let i = 0; i < listStudent.length; i++) {
      const student = listStudent[i];
      const row = document.createElement("tr");
      const col1 = document.createElement("td");
      const col2 = document.createElement("td");
      const col3 = document.createElement("td");
      const col4 = document.createElement("td");
      const col5 = document.createElement("td");
      const col6 = document.createElement("td");
      const col7 = document.createElement("td");
      const col8 = document.createElement("td");

      const btnDelete = document.createElement("button");
      const btnEdit = document.createElement("button");
      

      col1.innerHTML = student.id;
      col2.innerHTML = student.name;
      col3.innerHTML = student.sdt;
      col4.innerHTML = student.email;
      col5.innerHTML = student.address;
      col6.innerHTML = student.dob;
      col7.innerHTML = student.score;

      btnDelete.innerHTML = "Xóa";
      btnDelete.addEventListener("click", function () {
        deleteFunction(student.id);
      });

      btnEdit.innerHTML = "Sửa";
      btnEdit.addEventListener("click", function () {
        editFunction(student.id);
      });

      row.style.background = student.background;
      col8.appendChild(btnDelete);
      col8.appendChild(btnEdit);

      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.appendChild(col6);
      row.appendChild(col7);
      row.appendChild(col8);
      table.appendChild(row);
    }
  }

  btn.addEventListener("click", function () {
    if (
      inputName.value === "" ||
      inputAddress.value === "" ||
      inputDob.value === "" ||
      inputScore.value === "" ||
      inputSdt.value === "" ||
      inputEmail.value === "" 
  
    ) {
      return alert("Please fill all the fields");
    }

    if (editId !== null) {
      const indexStudentNeedEdit = listStudent.findIndex(
        (item) => item.id === editId
      );
      const newStudent = {
        id: editId,
        name: inputName.value,
        address: inputAddress.value,
        dob: inputDob.value,
        score: inputScore.value,
        sdt: inputSdt.value,
        email: inputEmail.value,
      };
      listStudent[indexStudentNeedEdit] = newStudent;
      editId = null;
    } else {
      const student = {
        id: "",
        name: inputName.value,
        address: inputAddress.value,
        dob: inputDob.value,
        score: inputScore.value,
        sdt: inputSdt.value,
        email: inputEmail.value,
      };
      listStudent.push(student);

      for (let n = 0; n < listStudent.length; n++) {
        listStudent[n].id = n + 1;
    }
    }
    refreshTable();
    clearInput();
  });
  function openModal() {
    modal.style.display = 'block';
  }
  
  // Close
  function closeModal() {
    modal.style.display = 'none';
  }
  
  // Close If Outside Click
  function outsideClick(e) {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  }

  function deleteFunction(id) {
    const index = listStudent.findIndex((item) => item.id === id);
    listStudent.splice(index, 1);
    refreshTable();
  }

  function editFunction(id) {
    const index = listStudent.findIndex((item) => item.id === id);
    const student = listStudent[index];
    inputName.value = student.name;
    inputAddress.value = student.address;
    inputDob.value = student.dob;
    inputScore.value = student.score;
    inputSdt.value = student.sdt;
    inputEmail.value = student.email;

    editId = id;
  }
};

