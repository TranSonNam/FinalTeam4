const form = document.querySelector("#registerForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const fullNameInput = document.querySelector("#fullname");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const fullname = fullNameInput.value;
  const listUser = JSON.parse(localStorage.getItem("listUser"))
    ? JSON.parse(localStorage.getItem("listUser"))
    : [];
  const user = {
    username,
    password,
    fullname,
  };

  listUser.push(user);
  localStorage.setItem("listUser", JSON.stringify(listUser));
  usernameInput.value = "";
  passwordInput.value = "";
  fullNameInput.value = "";
  alert("Đăng ký thành công");
});

function login() {
  window.location.href = "./login.html";
}
