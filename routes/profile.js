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
  const upLoadDirect = path.join("public/uploads");
  // console.log(emailID);

  try {
    await userDB.update(
      { profile_image: profile },
      { where: { username: emailID } }
    );
  } catch (err) {
    console.error(err);
  }

  try {
    const user = await userDB.findOne({ where: { username: emailID } });

    return res.render("mypage", { body: "users", user });
  } catch (err) {
    console.error(err);
  }

  // try {
  // const delImg = path.join(upLoadDirect, profile)
  // fs.statSync(delImg)
  // fs.unlinkSync(delImg)
  // } catch(err){
  // console.log("에러")
  // }
});

export default router;
