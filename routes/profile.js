import express from "express";
import modelDB from "../models/index.js";
import upload from "../modules/file_upload.js";
import fs from "fs";
import path from "path";
const router = express.Router();
const userDB = modelDB.models.user;

router.get("/", (req, res) => {
  res.render("mypage", { body: "users", users: {} });
});
router.post("/", upload.single("b_upfile"), async (req, res) => {
  const profile = req.file.filename;
  const emailID = req.body.username;
  // console.log(profile, emailID);
  const upLoadDirect = path.join("public/uploads/");
  let user;
  try {
    user = await userDB.findOne({ where: { username: emailID } });
  } catch (err) {
    console.error(err);
  }
  // console.log(user.profile_image);

  console.log(upLoadDirect + user.profile_image);
  try {
    fs.existsSync(upLoadDirect + user.profile_image);
    fs.unlinkSync(upLoadDirect + user.profile_image);
  } catch (err) {
    console.log(err);
  }

  try {
    await userDB.update(
      { profile_image: profile },
      { where: { username: emailID } }
    );
  } catch (err) {
    console.error(err);
  }
  try {
    user = await userDB.findOne({ where: { username: emailID } });
    return res.render("mypage", { body: "users", user });
  } catch (err) {
    console.error(err);
  }
});

export default router;
