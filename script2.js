
const fullname = JSON.parse(localStorage.getItem("userInfo")).fullname;
if (!localStorage.getItem("calendarList")) {
  localStorage.setItem("calendarList", JSON.stringify([]));
}

let calendarList = JSON.parse(localStorage.getItem('calendarList'));
let editId = null;

const table = document.querySelector("#table-data");
const nameInput = document.querySelector("#name");
const dayInput = document.querySelector("#day");
const stimeInput = document.querySelector("#stime");
const etimeInput = document.querySelector("#etime");
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

let stage = {
  columnName: "",
  flag: true,
}

sort.addEventListener("click", function() {
  stage.columnName = "id"
  if (stage.flag) {
    calendarList.sort(sortNoAsc);
      stage.flag = false;
      refreshTable();
  } else {
    calendarList.reverse(sortNoAsc);
      stage.flag = true;
      refreshTable();
  }
});

function sortNoAsc(firstEl, secondEl) {
  if (firstEl.id < secondEl.id) {
      return -1;
  }
  if (firstEl.id > secondEl.id) {
      return 1;
  }
  return 0;
}

sortName.addEventListener("click", function() {
  stage.columnName = "name";
  if (stage.flag) {
    calendarList.sort(sortNameAsc);
      stage.flag = false;
      refreshTable();
  } else {
    calendarList.reverse(sortNameAsc);
      stage.flag = true;
      refreshTable();
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


function search() {
  const searchValue = searchInput.value;
  const option = document.querySelector("#search-option").value;
  const searchArr = calendarList.filter(function(item) {
      return item[`name`].includes(searchValue);
  });
  console.log(searchArr);
  table.innerHTML = "";
  for (let i = 0; i < searchArr.length; i++) {
      const calendar = searchArr[i];
      const row = document.createElement("tr");
      const col1 = document.createElement("td");
      const col2 = document.createElement("td");
      const col3 = document.createElement("td");
      const col4 = document.createElement("td");
      const col5 = document.createElement("td");
      
      const col6 = document.createElement("td");
      const btnEdit = document.createElement("text");
      const btnDelete = document.createElement("text");

      col1.innerHTML = calendar.id;
      col2.innerHTML = calendar.name;
      col3.innerHTML = calendar.day;
      col4.innerHTML = calendar.stime;
      col5.innerHTML = calendar.etime;

      btnEdit.innerHTML = "<img src='./icon/edit.png' width='15px' height='15px' style='margin-right: 15px;'>";
      btnEdit.addEventListener('click', openModal);
      btnEdit.addEventListener("click", function () {
        editFunction(calendar.id);
      });
  
      btnDelete.innerHTML = "<img src='./icon/bin.png' width='15px' height='15px'>";
      btnDelete.addEventListener("click", function () {
        deleteFunction(calendar.id);
      });
  

      col6.appendChild(btnEdit);
      col6.appendChild(btnDelete);

      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.appendChild(col6);
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
  dayInput.value = "";
  stimeInput.value = "";
  etimeInput.value = "";
};

function refreshTable() {
  
  table.innerHTML = "";
  for (let i = 0; i < calendarList.length; i++) {
      const calendar = calendarList[i];
      const row = document.createElement("tr");
      const col1 = document.createElement("td");
      const col2 = document.createElement("td");
      const col3 = document.createElement("td");
      const col4 = document.createElement("td");
      const col5 = document.createElement("td");
      const col6 = document.createElement("td");
      const btnEdit = document.createElement("text");
      const btnDelete = document.createElement("text");

      col1.innerHTML = calendar.id;
      col2.innerHTML = calendar.name;
      col3.innerHTML = calendar.day;
      col4.innerHTML = calendar.stime;
      col5.innerHTML = calendar.etime;

      btnEdit.innerHTML = "<img src='./icon/edit.png' width='15px' height='15px' style='margin-right: 15px;'>";
      btnEdit.addEventListener('click', openModal);
      btnEdit.addEventListener("click", function () {
        editFunction(calendar.id);
      });
  
      btnDelete.innerHTML = "<img src='./icon/bin.png' width='15px' height='15px'>";
      btnDelete.addEventListener("click", function () {
        deleteFunction(calendar.id);
      });
  

      col6.appendChild(btnEdit);
      col6.appendChild(btnDelete);

      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.appendChild(col6);
      table.appendChild(row);
  }
};

add.addEventListener("click", function () {
  if (
    nameInput.value == "" ||
    dayInput.value == "" ||
    stimeInput.value == "" ||
    etimeInput.value == "" 
  ) {
      return alert("Please fill up the blanks !!!")
  };
  if (editId !== null) {
      const indexeditcalendarFunction = calendarList.findIndex((item) => item.id === editId);
      const newcalendar = {
          id: editId,
          name: nameInput.value,
          day: dayInput.value,
          stime: stimeInput.value,
          etime: etimeInput.value,
      };
      calendarList[indexeditcalendarFunction] = newcalendar;
      editId = null;
  } else {
      const newcalendar = {
          id: "",
          name: nameInput.value,
          day: dayInput.value,
          stime: stimeInput.value,
          etime: etimeInput.value,
      }
      calendarList.push(newcalendar);
      addId();
  }
  localStorage.setItem("calendarList", JSON.stringify(calendarList));
  closeModal();
  refreshTable();
  clearInput();
});

refreshTable();
console.log(calendarList);

function deleteFunction(id) {
  const index = calendarList.findIndex((item) => item.id === id);
  calendarList.splice(index, 1);
  localStorage.setItem("calendarList", JSON.stringify(calendarList)); 
  addId();
  refreshTable();
}

function editFunction(id) {
  const index = calendarList.findIndex((item) => item.id === id);
  const calendar = calendarList[index];
  nameInput.value = calendar.name;
  dayInput.value = calendar.day;
  stimeInput.value = calendar.stime;
  etimeInput.value = calendar.etime;
  editId = id;
  localStorage.setItem("calendarList", JSON.stringify(calendarList));
  refreshTable();
}

function addId() {
  for (let n = 0; n < calendarList.length; n++) {
    calendarList[n].id = n + 1;
  }
}

const menubtn = document.querySelector(".menu-btn")
const main = document.querySelector(".body")
const logo = document.querySelector(".logo")

let menu = {
  flag: true,
}

menubtn.addEventListener("click", function() {
  if (menu.flag) {
      menu.flag = false;
      main.style.marginLeft = "18%";
      logo.style.marginLeft = "18%";
    } else {
      menu.flag = true;
      main.style.marginLeft = "5px";
      logo.style.marginLeft = "5px";
    }
});
