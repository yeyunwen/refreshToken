import { refreshToken as refreshTokenApi } from "../api/index.js";

let p = null;

export const refreshToken = () => {
  if (p) {
    return p;
  }
  p = new Promise(async (resolve, reject) => {
    console.log("刷新token");
    const res = await refreshTokenApi();
    resolve(res);
  });
  p.finally(() => {
    p = null;
  });
  return p;
};

export const isRefresh = (config) => {
  return !!config.__isRefresh;
};
