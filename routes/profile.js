import express from "express";
import modelDB from "../models/index.js";
import upload from "../modules/file_upload.js";
const router = express.Router();
const userDB = modelDB.models.user;

router.get("/", (req, res) => {
  res.render("mypage", { users: "" });
});
router.post("/", upload.single("b_upfile"), async (req, res) => {
  const profile = req.file;
  console.log(profile);
});

export default router;
