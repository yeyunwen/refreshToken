import express from "express";

const app = express();
const router = express.Router();

let access_token = "access_token";
let refresh_token = "refresh_token";

let accessCreateTime = null;
const accessExpireTime = 3 * 1000;
let refreshCreateTime = null;
const refreshExpireTime = 20 * 1000;

router.get("/login", (req, res) => {
  accessCreateTime = Date.now();
  refreshCreateTime = Date.now();
  res.send({
    access_token,
    refresh_token,
  });
});

router.get("/fetchProtect", (req, res) => {
  const access_token = req.headers.authorization;
  if (!access_token) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }
  const now = Date.now();
  if (now - accessCreateTime > accessExpireTime) {
    return res.status(402).send({
      error: "token expired",
    });
  }
  res.send({
    data: "fetchProtect",
  });
});

router.get("/refreshToken", (req, res) => {
  console.log(req.headers);
  const refresh_token = req.headers.refreshtoken;
  if (!refresh_token) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }
  const now = Date.now();
  if (now - refreshCreateTime > refreshExpireTime) {
    return res.status(402).send({
      error: "refreshToken expired",
    });
  }
  accessCreateTime = Date.now();
  res.send({
    access_token,
    refresh_token,
  });
});

app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
