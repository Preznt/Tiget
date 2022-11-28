import express from "express";
import upload from "../modules/file_upload.js";
import moment from "moment";
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ss";

const router = express.Router();

router.get("/join", (req, res) => {
  res.render("users/join");
});

router.get("/join/register", (req, res) => {
  res.render("users/register");
});
router.get("/bltBrd", (req, res) => {
  res.render("users/bltBrd");
});
router.get("/bltBrd/write", (req, res) => {
  res.render("users/write");
});
router.post("/bltBrd/write", upload.single("c_image_file"), (req, res) => {
  console.log(req.body);
  const fileName = req?.file?.filename;
  const body = req.body;
  res.json({
    fileName,
    body,
    username: req.session.user.username,
  });
});

router.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;
  console.log({
    user_id,
    user_pw,
  });
  if (user_id === "tiget" && user_pw === "12345") {
    req.session.user = {
      username: user_id,
      real_name: "tiget",
      nick_name: "tiget",
      user_role: 1,
    };
    req.session.save(() => {
      res.redirect("/");
    });
  } else {
    const loginFail = {
      status: "USERNAME",
    };
    res.redirect("http://localhost:3002/main");
  }
});

export default router;
