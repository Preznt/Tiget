import express from "express";
import upload from "../modules/file_upload.js";

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
  res.send(body);
});
export default router;
