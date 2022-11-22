import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("main");
});

export default router;
