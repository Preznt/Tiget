import express from "express";
import modelDB from "../models/index.js";
import upload from "../modules/file_upload.js";
const router = express.Router();
const userDB = modelDB.models.user;

router.get("/", (req, res) => {
  res.render("mypage", { body: "users", users: {} });
});
router.post("/", upload.single("b_upfile"), async (req, res) => {
  const profile = req.file.filename;
  console.log(profile);
  const emailID = req.body.username;
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
});

export default router;
