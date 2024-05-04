import { login, fetchProtect, refreshToken } from "./api/index.js";

const loginBtn = document.getElementById("login");
const fetchBtn = document.getElementById("fetch");
const refreshBtn = document.getElementById("refresh");

loginBtn.addEventListener("click", () => {
  console.log("login");
  login().then((res) => {
    const { access_token, refresh_token } = res.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  });
});

fetchBtn.addEventListener("click", () => {
  console.log("fetch");
  fetchProtect();
});

refreshBtn.addEventListener("click", () => {
  console.log("refresh");
  refreshToken().then((res) => {
    const { access_token, refresh_token } = res.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  });
});
