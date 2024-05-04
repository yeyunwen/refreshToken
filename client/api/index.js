import request from "../net/index.js";

export const login = () => {
  return request({
    url: "/login",
    method: "GET",
  });
};

export const fetchProtect = () => {
  return request({
    url: "/fetchProtect",
    method: "GET",
  });
};

export const refreshToken = () => {
  return request({
    url: "/refreshToken",
    method: "GET",
    headers: {
      Refreshtoken: localStorage.getItem("refresh_token"),
    },
    __isRefresh: true,
  });
};
