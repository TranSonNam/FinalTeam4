
const fullname = JSON.parse(localStorage.getItem("userInfo")).fullname;

let staffList = [
  {
      id: 1,
      name: "B",
      gender: "male",
      dob: "1990-10-10",
      phone: "0915055032",
      email: "B@gmail.com",
      department: "usa",
  },
  {
      id: 2,
      name: "A",
      gender: "male",
      dob: "1991-11-11",
      phone: "081236598",
      email: "A@gmail.com",
      department: "Sales",
  },
  {
      id: 3,
      name: "M",
      gender: "female",
      dob: "1992-12-12",
      phone: "012356895",
      email: "M@gmail.com",
      department: "Accouting",
  },
];
let editId = null;

const table = document.querySelector("#table-data");
const nameInput = document.querySelector("#name");
const dobInput = document.querySelector("#dob");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const departmentInput = document.querySelector("#department");
const genderInput = document.querySelector("#gender");

const modal = document.querySelector(".modal");
const modalBtn = document.querySelector("#modalBtn");
const closeBtn = document.querySelector(".close");

const cancel = document.querySelector("#cancel");
const add = document.querySelector("#add");

const searchInput = document.querySelector("#search-bar");

const sort = document.querySelector(".sorting");
const sortName = document.querySelector(".sorting-name");
const userFullname = document.querySelector("#userfullname");
userFullname.innerHTML = "Hello:" + fullname;



modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
cancel.addEventListener('click', closeClick);
add.addEventListener('click', closeModal);

sort.addEventListener("click", function() {
  staffList.reverse();
  refreshTable();
});

sortName.addEventListener("click", function() {
  let stage = 0;
  if (stage = 0) {
      staffList.sort();
      refreshTable();
      stage = 1;
  } else if (stage = 1) {
      staffList.sort(sortNameAsc);
      refreshTable();
      stage = 2;
  } else {
      staffList.sort(sortNameDes);
      refreshTable();
      stage = 0;
  }
});

function sortNameAsc(firstEl, secondEl) {
  if (firstEl.name < secondEl.name) {
      return -1;
  }
  if (firstEl.name > secondEl.name) {
      return 1;
  }
  return 0;
}

function sortNameDes(firstEl, secondEl) {
  if (firstEl.name < secondEl.name) {
      return 1;
  }
  if (firstEl.name > secondEl.name) {
      return -1;
  }
  return 0;
}

function search() {
  const searchValue = searchInput.value;
  const option = document.querySelector("#search-option").value;
  const searchArr = staffList.filter(function(item) {
      return item[`${option}`].includes(searchValue);
  });
  console.log(searchArr);
  table.innerHTML = "";
  for (let i = 0; i < searchArr.length; i++) {
      const staff = searchArr[i];
      const row = document.createElement("tr");
      const col1 = document.createElement("td");
      const col2 = document.createElement("td");
      const col3 = document.createElement("td");
      const col4 = document.createElement("td");
      const col5 = document.createElement("td");
      const col6 = document.createElement("td");
      const col7 = document.createElement("td");
      
      const col8 = document.createElement("td");
      const btnEdit = document.createElement("text");
      const btnDelete = document.createElement("text");

      col1.innerHTML = staff.id;
      col2.innerHTML = staff.name;
      col3.innerHTML = staff.dob;
      col4.innerHTML = staff.phone;
      col5.innerHTML = staff.email;
      col6.innerHTML = staff.department;
      col7.innerHTML = staff.gender;

      btnEdit.innerHTML = "<img src='./icon/edit.png' width='15px' height='15px' style='margin-right: 15px;'>";
      btnEdit.addEventListener('click', openModal);
      btnEdit.addEventListener("click", function () {
        editFunction(staff.id);
      });
  
      btnDelete.innerHTML = "<img src='./icon/bin.png' width='15px' height='15px'>";
      btnDelete.addEventListener("click", function () {
        deleteFunction(staff.id);
      });
  

      col8.appendChild(btnEdit);
      col8.appendChild(btnDelete);

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

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function closeClick() {
    modal.style.display = 'none';
}

function clearInput() {
  nameInput.value = "";
  dobInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  departmentInput.value = "";
  genderInput.value = "";
};

function refreshTable() {
  
  table.innerHTML = "";
  for (let i = 0; i < staffList.length; i++) {
      const staff = staffList[i];
      const row = document.createElement("tr");
      const col1 = document.createElement("td");
      const col2 = document.createElement("td");
      const col3 = document.createElement("td");
      const col4 = document.createElement("td");
      const col5 = document.createElement("td");
      const col6 = document.createElement("td");
      const col7 = document.createElement("td");
      const col8 = document.createElement("td");
      const btnEdit = document.createElement("text");
      const btnDelete = document.createElement("text");

      col1.innerHTML = staff.id;
      col2.innerHTML = staff.name;
      col3.innerHTML = staff.gender;
      col4.innerHTML = staff.dob;
      col5.innerHTML = staff.phone;
      col6.innerHTML = staff.email;
      col7.innerHTML = staff.department;

      btnEdit.innerHTML = "<img src='./icon/edit.png' width='15px' height='15px' style='margin-right: 15px;'>";
      btnEdit.addEventListener('click', openModal);
      btnEdit.addEventListener("click", function () {
        editFunction(staff.id);
      });
  
      btnDelete.innerHTML = "<img src='./icon/bin.png' width='15px' height='15px'>";
      btnDelete.addEventListener("click", function () {
        deleteFunction(staff.id);
      });
  

      col8.appendChild(btnEdit);
      col8.appendChild(btnDelete);

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
};

add.addEventListener("click", function () {
  if (
    nameInput.value == "" ||
      dobInput.value == "" ||
      phoneInput.value == "" ||
      emailInput.value == "" ||
      departmentInput.value == "" ||
      genderInput.value == ""
  ) {
      return alert("Please fill up the blanks !!!")
  };
  if (editId !== null) {
      const indexeditStaffFunction = staffList.findIndex((item) => item.id === editId);
      const newStaff = {
          id: editId,
          name: nameInput.value,
          dob: dobInput.value,
          phone: phoneInput.value,
          email: emailInput.value,
          department: departmentInput.value,
          gender: genderInput.value,
      };
      staffList[indexeditStaffFunction] = newStaff;
      editId = null;
  } else {
      const newStaff = {
          id: "",
          name: nameInput.value,
          dob: dobInput.value,
          phone: phoneInput.value,
          email: emailInput.value,
          department: departmentInput.value,
          gender: genderInput.value,
      }
      staffList.push(newStaff);
      addId();
  }
  closeModal();
  refreshTable();
  clearInput();
});

refreshTable();
console.log(staffList);

function deleteFunction(id) {
  const index = staffList.findIndex((item) => item.id === id);
  staffList.splice(index, 1);
  addId();
  refreshTable();
}

function editFunction(id) {
  const index = staffList.findIndex((item) => item.id === id);
  const staff = staffList[index];
  nameInput.value = staff.name;
  dobInput.value = staff.dob;
  phoneInput.value = staff.phone;
  emailInput.value = staff.email;
  departmentInput.value = staff.department;
  genderInput.value = staff.gender;
  editId = id;
  refreshTable();
}

function addId() {
  for (let n = 0; n < staffList.length; n++) {
      staffList[n].id = n + 1;
  }
}

function nv() {
  window.location.href = './index.html';
}
function kh() {
  window.location.href = './index1.html';
}
function logout() {
  window.location.href = "./login.html";
}
