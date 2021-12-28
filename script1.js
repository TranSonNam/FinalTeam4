const fullname = JSON.parse(localStorage.getItem("userInfo")).fullname;
if (!localStorage.getItem("customerList")) {
  localStorage.setItem("customerList", JSON.stringify([]));
}

let customerList = JSON.parse(localStorage.getItem('customerList'));
  let editId = null;
  
  const table = document.querySelector("#table-data");
  const nameInput = document.querySelector("#name");
  const sdInput = document.querySelector("#sd");
  const phoneInput = document.querySelector("#phone");
  const emailInput = document.querySelector("#email");
  const departmentInput = document.querySelector("#department");
  const edInput = document.querySelector("#ed");
  
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
    isAsc: true,
  }
  
  sort.addEventListener("click", function() {
    stage.columnName = "id"
    if (stage.isAsc) {
      customerList.sort(sortNoAsc);
        stage.isAsc = false;
        refreshTable();
    } else {
      customerList.reverse(sortNoAsc);
        stage.isAsc = true;
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
    if (stage.isAsc) {
      customerList.sort(sortNameAsc);
        stage.isAsc = false;
        refreshTable();
    } else {
      customerList.reverse(sortNameAsc);
        stage.isAsc = true;
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
    const searchArr = customerList.filter(function(item) {
        return item[`${option}`].includes(searchValue);
    });
    console.log(searchArr);
    table.innerHTML = "";
    for (let i = 0; i < searchArr.length; i++) {
        const customer = searchArr[i];
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
  
        col1.innerHTML = customer.id;
        col2.innerHTML = customer.name;
        col3.innerHTML = customer.phone;
        col4.innerHTML = customer.email;
        col5.innerHTML = customer.department;
        col6.innerHTML = customer.sd;
        col7.innerHTML = customer.ed;
  
        btnEdit.innerHTML = "<img src='./icon/edit.png' width='15px' height='15px' style='margin-right: 15px;'>";
        btnEdit.addEventListener('click', openModal);
        btnEdit.addEventListener("click", function () {
          editFunction(customer.id);
        });
    
        btnDelete.innerHTML = "<img src='./icon/bin.png' width='15px' height='15px'>";
        btnDelete.addEventListener("click", function () {
          deleteFunction(customer.id);
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
    sdInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    departmentInput.value = "";
    edInput.value = "";
  };
  
  function refreshTable() {
    
    table.innerHTML = "";
    for (let i = 0; i < customerList.length; i++) {
        const customer = customerList[i];
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
  
        col1.innerHTML = customer.id;
        col2.innerHTML = customer.name;
        col3.innerHTML = customer.phone;
        col4.innerHTML = customer.email;
        col5.innerHTML = customer.department;
        col6.innerHTML = customer.sd;
        col7.innerHTML = customer.ed;
  
        btnEdit.innerHTML = "<img src='./icon/edit.png' width='15px' height='15px' style='margin-right: 15px;'>";
        btnEdit.addEventListener('click', openModal);
        btnEdit.addEventListener("click", function () {
          editFunction(customer.id);
        });
    
        btnDelete.innerHTML = "<img src='./icon/bin.png' width='15px' height='15px'>";
        btnDelete.addEventListener("click", function () {
          deleteFunction(customer.id);
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
        sdInput.value == "" ||
        phoneInput.value == "" ||
        emailInput.value == "" ||
        departmentInput.value == "" ||
        edInput.value == ""
    ) {
        return alert("Please fill up the blanks !!!")
    };
    if (editId !== null) {
        const indexeditcustomerFunction = customerList.findIndex((item) => item.id === editId);
        const newcustomer = {
            id: editId,
            name: nameInput.value,
            ed: edInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            department: departmentInput.value,
            sd: sdInput.value,
        };
        customerList[indexeditcustomerFunction] = newcustomer;
        editId = null;
    } else {
        const newcustomer = {
            id: "",
            name: nameInput.value,
            ed: edInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            department: departmentInput.value,
            sd: sdInput.value,
        }
        customerList.push(newcustomer);
        addId();
    }
    localStorage.setItem("customerList", JSON.stringify(customerList));
    closeModal();
    refreshTable();
    clearInput();
  });
  
  refreshTable();
  console.log(customerList);
  
  function deleteFunction(id) {
    localStorage.setItem("customerList", JSON.stringify(customerList));
    const index = customerList.findIndex((item) => item.id === id);
    customerList.splice(index, 1);
    addId();
    refreshTable();
  }
  
  function editFunction(id) {
    localStorage.setItem("customerList", JSON.stringify(customerList));
    const index = customerList.findIndex((item) => item.id === id);
    const customer = customerList[index];
    nameInput.value = customer.name;
    sdInput.value = customer.sd;
    phoneInput.value = customer.phone;
    emailInput.value = customer.email;
    departmentInput.value = customer.department;
    edInput.value = customer.ed;
    editId = id;
    refreshTable();
  }
  
  function addId() {
    for (let n = 0; n < customerList.length; n++) {
      customerList[n].id = n + 1;
    }
  }

  