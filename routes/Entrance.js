import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("title/title");
});

export default router;
