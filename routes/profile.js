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
  // const profile = req.file.filename;
  console.log(req.body);
  // const emailID = req.body.username;

  const upLoadDirect = path.join("public/uploads");
  // console.log(emailID);

  try {
    const profileIMG = await userDB.update(
      { profile_image: profile },
      { where: { username: emailID } }
    );
    res.redirect("/", { profileIMG });
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
